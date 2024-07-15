import Block from "../../tools/Block";
import {IImagePropsType} from "./types";

export default class ImageComponent extends Block {
    constructor(props: IImagePropsType) {
        super({
            ...props,
            attr: {
                alt: props.alt,
                src: props.url,
                class: props.className ? props.className : ""
            }
        })
    }
    render() {
        return `<img/>`
    }
}
