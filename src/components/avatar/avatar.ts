import Block from "../../tools/Block";
import ImageComponent from "../image/image";
import './avatar.scss'
import {IAvatarProps} from "./types";

export default class Avatar extends Block {
    constructor (props: IAvatarProps) {
        super({
            image: new ImageComponent({
                alt: "avatar",
                url: props.url ? props.url : "https://doodleipsum.com/700/avatar?i=7aa650776eee7ca68a32d5d808fc4f57",
                onClick: () => console.log("avatar")
            })
        })
    }
    componentDidUpdate(oldProps: IAvatarProps, newProps: IAvatarProps) {
        if (oldProps.url !== newProps.url) {
            this.children.image.setProps({url: newProps.url})
        }
        return true;
    }

    render() {
        return `<div class="myAvatar">
                    {{{ image }}}
                </div>`
    }
}
