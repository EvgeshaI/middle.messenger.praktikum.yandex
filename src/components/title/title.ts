import Block from "../../tools/Block";
import './title.scss';
import {ITitlePropsType} from "./types";

export default class Title extends Block {
    constructor(props: ITitlePropsType) {
        super({
            ...props,
            attr: {
                class: "title"
            }
        })
    }
    render() {
        return `<h1>
                    {{ text }}
                </h1>`
    }
}
