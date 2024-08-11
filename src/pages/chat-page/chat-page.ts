import Block from "../../tools/Block";
import './chat-page.scss'
import Navbar from "../../components/navbar/navbar";
import ImageComponent from "../../components/image/image";
import Input from "../../components/input/input";
import Title from "../../components/title/title";
import ChatItem from "../../components/chat-item/chat-item";
import ButtonComponent from "../../components/button/button";
import store, {IChat, IUser, State} from "../../tools/Store";
import ApiServiceChat from "./apiChat";
import Message from "../../components/message/message";

export default class ChatPage extends Block {
    constructor() {
        super({
            navbar: new Navbar({
                url: ""
            }),
            searchImg: new ImageComponent({
                alt: "search",
                url: "../../static/svg/search.svg",
                onClick: () => console.log("search chat")
            }),
            inputSearch: new Input({
                placeholder: "search",
                className: "inputSearch",
                title: "search",
                name: "search",
                value: ""
            }),
            inputUserLogin: new  Input({
                placeholder: "type name user for add to chat",
                className: "noneElement",
                title: "inputUserLogin",
                name: "inputUserLogin",
                value: ""
            }),
            inputChatName: new Input({
                placeholder: "type chat name",
                className: "inputChat",
                name: "chatName",
                title: "chatName",
                value: "",
                events: {
                    input: () => {},
                }
            }),
            chatsTitle: new Title({text: "Chats"}),
            buttonNewChat: new ButtonComponent({
                text: "new chat",
                events: {
                    click: () => {
                        this.openFormForCreateChat()
                    }
                }
            }),
            iconAddUser: new ImageComponent({
                alt: "addUser",
                url: "../../static/svg/add.svg",
                className: "noneElement",
                onClick: () => {
                    this.addUser()
                }
            }),
            iconDeleteUsersChat: new ImageComponent({
                alt: "addUser",
                url: "../../static/svg/delete.svg",
                className: "noneElement",
                onClick: () => {
                    this.deleteUsersOnChat()
                }
            }),
            iconCheck: new ImageComponent({
                alt: "check",
                url: "../../static/svg/check.svg",
                className: "iconMessageInput",
                onClick: () => {
                    this.addNewChat()
                }
            }),
            iconClose: new ImageComponent({
                alt: "check",
                url: "../../static/svg/close.svg",
                className: "iconMessageInput",
                onClick: () => {
                    this.closeFormForChat()
                }
            }),
            iconSendMessage: new ImageComponent({
                alt: "addUser",
                url: "../../static/svg/send.svg",
                className: "",
                onClick: () => {
                    this.sendMessage()
                }
            }),
            chatTitle: new Title({
                text: ""
            }),
            messageInput: new Input({
                placeholder: "Type your message here...",
                className: "message",
                name: "message",
                title: "message",
                value: "",
                events: {
                    input: () => {},
                }
            }),
            chatsList: [],
            messages: [],
        })
    }

     componentDidMount() {
        const apiService = new ApiServiceChat()
        apiService.getChats()
            .then(r => {
                const xhr = r as XMLHttpRequest;
                const chats = JSON.parse(xhr.responseText) as Array<IChat>
                store.dispatch({
                    type: 'SET_CHATS',
                    chats: chats
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    inputChatBlock () {
        return  this.element!.querySelector(`.inputChatBlock`)! as HTMLElement;
    }
    openFormForCreateChat () {
        this.inputChatBlock().style.visibility = "initial"
    }
    closeFormForChat () {
        this.inputChatBlock().style.visibility = "hidden"
    }
    inputField (nameAtr: string) {
        return this.element!.querySelector(`input[name=${nameAtr}]`) as HTMLInputElement;
    }

    apiService = new ApiServiceChat()
    socket: WebSocket | null = null;

    initializeWebSocket(token: string) {
        const userId = store.getState().user!.id;
        const chatId = store.getState().currentChat!.id


        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);
        socket.addEventListener('open', () => {
            console.log('Соединение установлено');
            socket.send(JSON.stringify({
                content: '0',
                type: 'get old',
            }));

        });
        socket.addEventListener('close', event => {
            if (event.wasClean) {
                console.log('Соединение закрыто чисто');
            } else {
                console.log('Обрыв соединения');
            }
            console.log(`Код: ${event.code} | Причина: ${event.reason}`);
        });
        socket.addEventListener('message', event => {
            console.log('Получены данные', JSON.parse(event.data));
            const messageData = JSON.parse(event.data);
            if (messageData.type === "message"){
                store.dispatch({
                    type: 'ADD_MESSAGE',
                    chatId: chatId,
                    message: messageData
                });
            }
            if(Array.isArray(messageData)){
                store.dispatch({
                    type: 'ADD_OLD_MESSAGES',
                    messages: messageData.reverse()
                });
            }
            const messageInputContainer = this.element!.querySelector(`.messageInputContainer`)! as HTMLElement;
            messageInputContainer.style.visibility = "initial"
        });
        socket.addEventListener('error', event => {
            console.log('Ошибка', event);
        });
        this.socket = socket;
    }


    addNewChat () {
        const formData = {
            title: this.inputField("chatName").value
        }
        this.apiService.addNewChat(formData)
            .then(() => {
                this.closeFormForChat()
                return this.apiService.getChats()
                    .then(r => {
                        const xhr = r as XMLHttpRequest;
                        const chats = JSON.parse(xhr.responseText) as Array<IChat>
                        store.dispatch({
                            type: 'SET_CHATS',
                            chats: chats
                        });
                })
            })
            .catch(err => console.error("Error:", err));
    }

    addUser () {
        const formData = {
            login: this.inputField("inputUserLogin").value
        }

        this.apiService.findUserRequest(formData)
            .then(r => {
                const xhr = r as XMLHttpRequest;
                const usersId = JSON.parse(xhr.responseText).map((el: IUser) => el.id) as Array<number>
                const user = {
                    users: usersId,
                    chatId: store.getState().currentChat!.id
                }
                this.inputField("inputUserLogin").value = ""
                return this.apiService.addUserToChat(user)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    deleteUsersOnChat () {
        const usersId = store.getState().usersId
        const chatId = store.getState().currentChat!.id
        const data = {
            users: usersId,
            chatId: chatId
        }
        this.apiService.deleteUsers(data).then(() => {
            store.dispatch({
                type: 'DELETE_USERS',
                chatId: chatId
            });
        })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    chooseChat(chat: IChat) {
        store.dispatch({
            type: 'SET_CURRENT_CHAT',
            currentChat: chat
        });
        this.apiService.getToken(chat.id)
            .then(r => {
                const xhr = r as XMLHttpRequest;
                const token = JSON.parse(xhr.responseText).token as string;
                store.dispatch({
                    type: 'SET_TOKEN',
                    token: token
                });
                this.initializeWebSocket(token);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        this.apiService.getUsersInChat(chat.id)
            .then(r => {
                const xhr = r as XMLHttpRequest;
                const usersId = JSON.parse(xhr.responseText).map((el: IUser) => el.id) as Array<number>
                store.dispatch({
                    type: 'SET_USERS_ID',
                    usersId: usersId
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    sendMessage () {
        const message = this.inputField("message").value
        this.socket!.send(JSON.stringify({
            content: message,
            type: 'message',
        }))
        this.inputField("message").value = ""
    }

    componentDidUpdate(oldProps: State, newProps: State) {
        if (oldProps.chats !== newProps.chats) {
            this.lists.chatsList = store.getState().chats.map(chat => {
                const lastMessage = chat.last_message ? `${chat.last_message.content.slice(0, 20)}...` : ""
                    return new ChatItem({
                        id: chat.id,
                        name: chat.title,
                        message: lastMessage,
                        unread: chat.unread_count,
                        time: chat.last_message ? chat.last_message.time.slice(11, 16) : "",
                        events: {
                            click: () => {
                                this.chooseChat(chat)
                            }
                        }
                    })
            }
            );
        }
        if (oldProps.user !== newProps.user){
            const user = newProps.user
            if(user){
                this.children.navbar.setProps({url: `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`})
            }
        }
        if(oldProps.currentChat !== newProps.currentChat){
            const currentChat = newProps.currentChat
            if(currentChat){
                this.children.inputUserLogin.setProps({className: "inputChat"})
                this.children.iconAddUser.setProps({className: "iconMessageInput"})
                this.children.iconDeleteUsersChat.setProps({className: "iconMessageInput"})
                this.children.chatTitle.setProps({text: currentChat.title})
            }else{
                this.children.inputUserLogin.setProps({className: "noneElement"})
                this.children.iconAddUser.setProps({className: "noneElement"})
                this.children.iconDeleteUsersChat.setProps({className: "noneElement"})
                this.children.chatTitle.setProps({text: ""})
            }
        }
        if(oldProps.messages !== newProps.messages) {
            this.lists.messages = store.getState().messages.map(message => {
                    return new Message({
                        myId: store.getState().user!.id,
                        userId: message.user_id,
                        text: message.content
                    })
                }
            );
            setTimeout(() => {
                const messagesBlock = this.element!.querySelector('.messagesBlock')! as HTMLElement;
                messagesBlock.scrollTop = messagesBlock.scrollHeight;
            }, 0);
        }
        return true;
    }


    override render() {

        return `<main class="chatContainer">
                    {{{ navbar }}}
                    <div class="chatList">
                        <div class="search">
                            {{{ searchImg }}}
                            {{{ inputSearch }}}
                        </div>
                        <div class="contactList">
                            {{{ chatsTitle }}}
                            {{{ buttonNewChat }}}
                            <div class="inputChatBlock">
                                {{{ inputChatName }}}
                                {{{ iconCheck }}}
                                {{{ iconClose }}}
                            </div>
                            <ul>
                                {{{ chatsList }}}
                            </ul>
                        </div>
                    </div>
                    <div class="chat" id="chat">
                        <div class="headerChat">
                        {{{ chatTitle }}}
                        {{{ inputUserLogin }}}
                        {{{ iconAddUser }}}
                        {{{ iconDeleteUsersChat }}}
                        </div>
                        <div class="messagesBlock">
                        {{{ messages }}}
                        </div>
                        <div class="messageInputContainer">
                        {{{ messageInput }}}
                        {{{ iconSendMessage }}}
                        </div>
                    </div>
                </main>`
    }
}
