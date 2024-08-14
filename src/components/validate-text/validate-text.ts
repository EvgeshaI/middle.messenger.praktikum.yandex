import Block from "../../tools/Block";
import './validate-text.scss'
import {IValidateTextPropsType} from "./types";

export default class ValidateText extends Block {
    constructor(props: IValidateTextPropsType) {
        super({
            ...props,
            attr: {
                class: props.isConfirmPassword ? "confirmPassword" : "validate",
                id: props.isConfirmPassword ? "confirmPassword" : "error-text"
            }
        })
    }

    render() {
        return `<div>{{ text }}</div>`
    }
}
