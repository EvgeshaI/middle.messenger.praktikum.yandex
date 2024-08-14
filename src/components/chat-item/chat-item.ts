import Block from "../../tools/Block";
import './chat-item.scss'
import {IChatItemPropsType} from "./types";
import ImageComponent from "../image/image";
import ApiServiceChat from "../../pages/chat-page/apiChat";
import store from "../../tools/Store";

export default class ChatItem extends Block {
    constructor(props: IChatItemPropsType) {
        super({
            ...props,
            name: props.name,
            message: props.message,
            unread: props.unread,
            time: props.time,
            deleteIcon: new ImageComponent({
                alt: "addUser",
                url: "../../static/svg/delete.svg",
                className: "",
                onClick: () => {
                    this.deleteChat()
                }
            })
        })
    }


    apiService = new ApiServiceChat()
    deleteChat () {
        const data = {
            chatId: this.props.id
        }
        this.apiService.deleteChat(data)
            .then(res => {
                const xhr = res as XMLHttpRequest;
                if(xhr.status <=200 || xhr.status < 300){
                    store.dispatch({
                        type: 'DELETE_CHAT',
                        chatId: this.props.id
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    componentDidMount() {
        const chatItem = this.element!.querySelector('.chatItem') as HTMLElement;
        if (chatItem) {
            chatItem.addEventListener('click', this.props.onClick);
        }
    }

     render () {
        return `<li class="chatItemContainer"> 
                    <div class="chatItem">
                    <div class="avatarBlock">
                        <div class="avatar"> </div>
                    </div>
                    <div class="messageBlock">
                        <div class="name">{{ name }}</div>
                        <div class="text">{{ message }}</div>
                    </div>
                    <div class="messageInfo">
                        <div class="time">{{ time }}</div>
                        <div class="unread">{{ unread }}</div>
                    </div>
                    </div>
                    {{{ deleteIcon }}}
                </li>`
    }
}
