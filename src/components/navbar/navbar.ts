import Block from "../../tools/Block";
import Avatar from "../avatar/avatar";
import ImageComponent from "../image/image";
import './navbar.scss'
import Router from "../../tools/Router";
import {HTTPTransport} from "../../tools/Requests";
import {IAvatarProps} from "../avatar/types";

export default class Navbar extends Block {
    constructor(props: IAvatarProps) {
        super({
            avatar: new Avatar({
                url: props.url
            }),
            homeImg: new ImageComponent({
                alt: "home",
                url: "../../static/svg/home.svg",
               onClick: () => {console.log("error")}
            }),
            messageImg: new ImageComponent({
                alt: "message",
                url: "../../static/svg/message.svg",
                onClick: () => {
                        this.router.go("/messenger")
                }
            }),
            settingsImg: new ImageComponent({
                alt: "settings",
                url: "../../static/svg/settings.svg",
                onClick: () => {
                        this.router.go("/settings")
                }
            }),
            logoutImg: new ImageComponent({
                alt: "exit",
                url: "../../static/svg/exit.svg",
                onClick: () => {
                        this.logout()
                }
            })
        })
    }
    router = new Router("app");
    httpTransport = new HTTPTransport()
    logout () {
        const options = {
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Credentials': 'true',
            },
        }
        this.httpTransport.post('https://ya-praktikum.tech/api/v2/auth/logout', options)
            .then(response => {
                const res = response as XMLHttpRequest;
                if(res.status >= 200 && res.status < 300){
                    localStorage.removeItem("user")
                    this.router.go("/")
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    componentDidUpdate(oldProps: IAvatarProps, newProps: IAvatarProps) {
        if (oldProps.url !== newProps.url) {
            this.children.avatar.setProps({url: newProps.url})
        }
        return true;
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
