import Title from "../../components/title/title";
import ButtonComponent from "../../components/button/button";
import Input from "../../components/input/input";
import LinkText from "../../components/link-text/link-text";
import './login-page.scss';
import ValidateText from "../../components/validate-text/validate-text";
import FormFunctions from "../../tools/FormFunctions";
import RegisterPage from "../register-page/register-page";
import ChatPage from "../chat-page/chat-page";

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
                        this.navigateToPage(RegisterPage);
                    }
                }
            })
        })
    }


    handleSubmit(event: Event) {
        event.preventDefault();
        if(this.validateLogin(event) && this.validatePassword(event)) {
            const formData = {
                login : this.inputField("login").value,
                password: this.inputField("password").value
            }
            console.log(formData)
            this.navigateToPage(ChatPage)
        }else {
            this.errorElement().style.visibility = "initial"
        }
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
