import Block from "../../tools/Block";
import './error-page.scss';
import LinkText from "../../components/link-text/link-text";
import {IErrorPagePropsType} from "./types";

export default class ErrorPage extends Block {
    constructor(props: IErrorPagePropsType) {
        super({
            ...props,
            linkToPage: new LinkText({
                text: props.text === "500" ? "400" : "",
                events: {
                    click: () => {}
                }
            }),
            linkToChat: new LinkText({
                text: "to chats",
                events: {
                    click: () => {}
                }
            }),
        })
    }
    render() {
        return ` <main class="errorContainer">
                    <div class="errorText">
                        {{ text }}
                    </div>
                    {{{ linkToPage }}}
                    {{{ linkToChat }}}
                </main>`
    }
}
