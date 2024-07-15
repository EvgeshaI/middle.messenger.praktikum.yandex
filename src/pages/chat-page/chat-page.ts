import Block from "../../tools/Block";
import './chat-page.scss'
import Navbar from "../../components/navbar/navbar";
import ImageComponent from "../../components/image/image";
import Input from "../../components/input/input";
import Title from "../../components/title/title";
import ChatItem from "../../components/chat-item/chat-item";
import MessageInput from "../../components/message-input/message-input";

export default class ChatPage extends Block {
    constructor() {
        super({
            navbar: new Navbar(),
            searchImg: new ImageComponent({
                alt: "search",
                url: "../../static/svg/search.svg"
            }),
            inputSearch: new Input({
                placeholder: "search",
                className: "inputSearch",
                title: "search",
                name: "search"
            }),
            chatsTitle: new Title({text: "Chats"}),
            messageInput: new MessageInput(),
            chatsList: [
                new ChatItem({ name: 'Friends Forever', message: 'Hahahahah', unread: '4', time: 'Today, 9.52pm'}),
                new ChatItem({ name: 'Mera Gang', message: 'Kyuuuuu???', unread: '4', time: 'Yesterday, 12.31pm'}),
                new ChatItem({ name: 'Hiking', message: 'It’s not going to happen', unread: '4', time: 'Wednesday, 9.12am'}),
                new ChatItem({ name: 'Anil', message: 'April fool’s day', unread: '4', time: 'Today, 9.52pm'}),
                new ChatItem({ name: 'Chuuthiya', message: 'Baag', unread: '1', time: 'Today, 12.11pm'}),
                new ChatItem({ name: 'Mary ma’am', message: 'You have to report it...', unread: '1', time: 'Today, 2.40pm'}),
                new ChatItem({ name: 'Bill Gates', message: 'Nevermind bro', unread: '5', time: 'Yesterday, 12.31pm'}),
                new ChatItem({ name: 'Victoria H', message: 'Okay, brother. let’s see', unread: '1', time: 'Wednesday, 11.12am'}),
            ]
        })
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
                            <ul>
                                {{{ chatsList }}}
                            </ul>
                        </div>
                    </div>
                    <div class="chat">
                        <div class="headerChat">
                        </div>
                        <div class="messagesBlock"></div>
                        {{{ messageInput }}}
                    </div>
                </main>`
    }
}
