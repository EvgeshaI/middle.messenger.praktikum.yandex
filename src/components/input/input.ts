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
                value: props.value ? props.value : "",
                placeholder: props.placeholder,
                class: props.className ? props.className : ""
            }
        })
    }

    componentDidUpdate(oldProps: IInputPropsType, newProps: IInputPropsType) {
        if (oldProps.value !== newProps.value) {
            this.props.attr = {...this.props.attr, value: newProps.value}
        }
        if(oldProps.className !== newProps.className){
            if(newProps.className)
            this.props.attr = {...this.props.attr, class: newProps.className}
        }
        return true;
    }

    render() {
        return `<input/>`
    }
}
