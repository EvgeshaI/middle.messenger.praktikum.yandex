import Block from "../../tools/Block";
import './input.scss';
import {IInputPropsType} from "./types";

export default class Input extends Block {
    constructor(props: IInputPropsType) {
        super({
            ...props,
            attr: {
                type: props.type ? props.type : "",
                title: props.title,
                name: props.name,
                placeholder: props.placeholder,
                class: props.className ? props.className : ""
            }
        })
    }

    render() {
        return `<input/>`
    }
}
