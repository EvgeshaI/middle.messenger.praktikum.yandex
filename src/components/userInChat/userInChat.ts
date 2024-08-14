import FormFunctions from "../../tools/FormFunctions";
import {UserInChatPropsType} from "./types";
import './userInChat.scss'
import ImageComponent from "../image/image";
import ApiServiceChat from "../../pages/chat-page/apiChat";
import store from "../../tools/Store";

export default class UserInChat extends FormFunctions {
    constructor(props: UserInChatPropsType) {
        super({
            ...props,
            text: props.text,
            deleteIcon: new ImageComponent({
                alt: "addUser",
                    url: "../../static/svg/delete.svg",
                    className: "",
                    onClick: () => {
                    this.deleteUser()
                    }
            })
        })
    }

    apiService = new ApiServiceChat()
    deleteUser () {
        const data = {
            users: [this.props.userId],
            chatId: this.props.chatId
        }
        this.apiService.deleteUsers(data).then(() => {
            store.dispatch({
                type: 'DELETE_USER',
                userId: this.props.userId
            })
        })
            .catch(error => {
                console.error('Error:', error);
            })
    }


    render() {
        return `<div class="userInChat">
                    {{{ text }}}
                    {{{ deleteIcon}}}
                </div>`
    }
}
