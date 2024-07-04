import Block from "../../tools/Block";
import './link-text.scss';
import {ILinkTextPropsType} from "./types";

export default class LinkText extends Block {
    constructor(props: ILinkTextPropsType) {
        super({
            ...props,
            attr: {
                class: "linkText",
            }
        })
    }
    render() {
        return `<a>
                    {{ text }}
                </a>`
    }
}
