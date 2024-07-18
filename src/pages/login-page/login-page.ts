import Title from "../../components/title/title";
import ButtonComponent from "../../components/button/button";
import Input from "../../components/input/input";
import LinkText from "../../components/link-text/link-text";
import './login-page.scss';
import ValidateText from "../../components/validate-text/validate-text";
import FormFunctions from "../../tools/FormFunctions";
import Router from "../../tools/Router";
import {HTTPTransport} from "../../tools/Requests";

export default class LoginPage extends FormFunctions {
    constructor() {
        super({
            title: new Title({text: "Login"}),
            button: new ButtonComponent({
                text: "Sign in",
                events: {
                    click: (e: Event) => {
                        this.handleSubmit(e)
                    }
                }
            }),
            inputLogin: new Input({
                placeholder: "login",
                className: "inputStyle",
                name: "login",
                title: "login",
                events: {
                    input: () => { this.changeInput( "login")},
                    blur: (e) => this.validateLogin(e)
                }
            }),
            inputPassword: new Input ({
                placeholder: "password",
                className: "inputStyle",
                name: "password",
                type: "password",
                title: "password",
                events: {
                    input: () => { this.changeInput("password")},
                    blur: (e) => this.validatePassword(e)
                }
            }),
            errorText: new ValidateText({text: "incorrect login or password"}),
            link: new LinkText({
                text: "Create account",
                events: {
                    click: (e: Event) => {
                        e.preventDefault();
                        this.navigateToRegister()
                    }
                }
            })
        })
    }
    router = new Router("app");

    httpTransport = new HTTPTransport()

    handleSubmit(event: Event) {
        event.preventDefault();
        if(this.validateLogin(event) && this.validatePassword(event)) {
            const formData = {
                login : this.inputField("login").value,
                password: this.inputField("password").value
            }
            const options = {
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(formData)
            }
            this.httpTransport.post('https://ya-praktikum.tech/api/v2/auth/signin', options)
                .then(response => {
                    console.log(formData)
                    if(response.status >= 200 && response.status < 300){
                        this.router.go("/messenger")
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });

        }else {
            this.errorElement().style.visibility = "initial"
        }
    }

    navigateToRegister () {
        this.router.go("/sign-up")
    }

     render() {

        return `<form class="loginContent">
                <header>
                    {{{ title }}}
                </header>
                <div class="inputs">
                    {{{ inputLogin }}}
                    {{{ inputPassword }}}
                </div>
                    {{{ errorText }}}
                <footer class="loginFooter">
                    {{{ button }}}
                    {{{ link }}}
                </footer>
            </form>`
    }
}
