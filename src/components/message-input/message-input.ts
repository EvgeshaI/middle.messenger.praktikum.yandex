import Block from "../../tools/Block";
import './message-input.scss'
import MessageTextarea from "../message-textarea/message-textarea";
import ImageComponent from "../image/image";

export default class MessageInput extends Block {
    constructor() {
        super({
            messageText: new MessageTextarea({className: "message"}),
            iconFile: new ImageComponent({
                alt: "addfile",
                url: "../../static/svg/addfile.svg",
                className: "iconMessageInput",
                onClick: () => console.log("load file")
            }),
            iconEmoji: new ImageComponent({
                alt: "emoji",
                url: "../../static/svg/emoji.svg",
                className: "iconMessageInput",
                onClick: () => console.log("chose emoji")
            }),
            iconCamera: new ImageComponent({
                alt: "camera",
                url: "../../static/svg/camera.svg",
                className: "iconMessageInput",
                onClick: () => console.log("load image")
            })
        })
    }

    render() {
        return `<div class="messageInputContainer">
                    <div class="blockInput1">
                        {{{ iconFile }}}
                    </div>
                    <label class="blockInput2">
                        {{{ messageText }}}
                    </label>
                    <div class="blockInput3">
                        {{{ iconEmoji }}}
                        {{{ iconCamera }}}
                    </div>
                </div>`
    }
}
