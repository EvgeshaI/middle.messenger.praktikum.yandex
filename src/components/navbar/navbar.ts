import Block from "../../tools/Block";
import Avatar from "../avatar/avatar";
import ImageComponent from "../image/image";
import './navbar.scss'
import LoginPage from "../../pages/login-page/login-page";
import UserSettingsPage from "../../pages/user-settings-page/user-settings-page";
import ChatPage from "../../pages/chat-page/chat-page";
import ErrorPage from "../../pages/error-page/error-page";

export default class Navbar extends Block {
    constructor() {
        super({
            avatar: new Avatar(),
            homeImg: new ImageComponent({
                alt: "home",
                url: "../../static/svg/home.svg",
                events: {
                    click: () => this.navigateToPage(ErrorPage, "500")
                }
            }),
            messageImg: new ImageComponent({
                alt: "message",
                url: "../../static/svg/message.svg",
                events: {
                    click: () => this.navigateToPage(ChatPage)
                }
            }),
            settingsImg: new ImageComponent({
                alt: "settings",
                url: "../../static/svg/settings.svg",
                events: {
                    click: () => this.navigateToPage(UserSettingsPage)
                }
            }),
            logoutImg: new ImageComponent({
                alt: "exit",
                url: "../../static/svg/exit.svg",
                events: {
                    click: () => this.navigateToPage(LoginPage)
                }
            })
        })
    }

    override render() {
        return `<nav class="navbar">
                    {{{ avatar }}}
                    <div class="navigation">
                        {{{ homeImg }}}
                        {{{ messageImg }}}
                        {{{ settingsImg }}}
                    </div>
                    <div class="logout">
                        {{{ logoutImg }}}
                    </div>
                </nav>`
    }
}
