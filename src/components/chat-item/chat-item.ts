import Block from "../../tools/Block";
import './chat-item.scss'
import {IChatItemPropsType} from "./types";

export default class ChatItem extends Block {
    constructor(props: IChatItemPropsType) {
        super({
            ...props,
            name: props.name,
            message: props.message,
            unread: props.unread,
            time: props.time
        })
    }



     render () {
        return `<li class="chatItem"> 
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
                </li>`
    }
}
