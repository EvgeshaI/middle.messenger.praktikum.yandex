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
            },
            events: {
                click: () => props.onClick()
            }

        })
    }
    componentDidUpdate(oldProps: IImagePropsType, newProps: IImagePropsType) {
        if (oldProps.url !== newProps.url) {
            this.props.attr = {...this.props.attr, src: this.props.url}
        }
        if(oldProps.className !== newProps.className){
            if(newProps.className){
                this.props.attr = {...this.props.attr, class: newProps.className}
            }
        }
        return true;
    }
    render() {
        return `<img/>`
    }
}
