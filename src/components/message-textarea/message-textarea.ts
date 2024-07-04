import Block from "../../tools/Block";
import {IMessageTextPropsType} from "./types";

export default class MessageTextarea extends Block {
    constructor(props: IMessageTextPropsType) {
        super({
            ...props,
            events: {
                change: (e: Event) => {console.log(e.target)},
            },
            attr: {
                name: "message",
                placeholder: "Type your message here...",
                class: props.className
            }
        })
    }

    render() {
        return `<textarea></textarea>`
    }
}
