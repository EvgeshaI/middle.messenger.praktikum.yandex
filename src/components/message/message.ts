import Block from "../../tools/Block";
import './message.scss'
import {IMessagePropsType} from "./types";

export default class Message extends Block {
    constructor(props: IMessagePropsType) {
        super({
            ...props,
            text: props.text,
            attr: {
                class: props.myId === props.userId ? "myMessage" : "userMessage"
            }
        })
    }

    render () {
        return `<div>
                    {{{ text }}}
                </div>`
    }
}
