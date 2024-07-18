import Block from "../../tools/Block";
import Avatar from "../avatar/avatar";
import ImageComponent from "../image/image";
import './navbar.scss'
import Router from "../../tools/Router";
import {HTTPTransport} from "../../tools/Requests";

export default class Navbar extends Block {
    constructor() {
        super({
            avatar: new Avatar(),
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
                if(response.status >= 200 && response.status < 300){
                    this.router.go("/")
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
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
