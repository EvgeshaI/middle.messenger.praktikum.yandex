import FormFunctions from "../../tools/FormFunctions";
import {UserInChatPropsType} from "./types";
import './userInChat.scss'
import ImageComponent from "../image/image";

export default class UserInChat extends FormFunctions {
    constructor(props: UserInChatPropsType) {
        super({
            ...props,
            text: props.text,
            deleteIcon: new ImageComponent({
                alt: "addUser",
                    url: "../../static/svg/delete.svg",
                    className: "noneElement",
                    onClick: () => {
                    }
            })
        })
    }


    render() {
        return `<div class="userInChat">
                    <div>
                    {{{ text }}}
                    </div>
                    {{{ deleteIcon}}}
                </div>`
    }
}
