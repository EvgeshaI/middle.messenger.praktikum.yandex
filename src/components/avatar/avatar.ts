import Block from "../../tools/Block";
import ImageComponent from "../image/image";
import './avatar.scss'

export default class Avatar extends Block {
    constructor () {
        super({
            image: new ImageComponent({
                alt: "avatar",
                url: "https://doodleipsum.com/700/avatar?i=7aa650776eee7ca68a32d5d808fc4f57"
            })
        })
    }

    render() {
        return `<div class="myAvatar">
                    {{{ image }}}
                </div>`
    }
}
