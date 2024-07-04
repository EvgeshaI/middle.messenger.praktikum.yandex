import Block from "../../tools/Block";
import './validate-text.scss'
import {IValidateTextPropsType} from "./types";

export default class ValidateText extends Block {
    constructor(props: IValidateTextPropsType) {
        super({
            ...props,
            attr: {
                class: "validate",
                id: "error-text"
            }
        })
    }

    render() {
        return `<div>{{ text }}</div>`
    }
}
