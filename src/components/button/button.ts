import Block from "../../tools/Block";
import './button.scss';
import {IButtonPropsType} from "./types";

export default class ButtonComponent extends Block {
    constructor(props: IButtonPropsType) {
        super({
            ...props,
            attr: {
                class: "button"
            }
        })
    }

    render() {
        return ` <button>
                    {{ text }}
                </button>`
    }
}
