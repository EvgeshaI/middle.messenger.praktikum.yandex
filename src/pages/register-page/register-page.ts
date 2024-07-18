import Title from "../../components/title/title";
import ButtonComponent from "../../components/button/button";
import Input from "../../components/input/input";
import LinkText from "../../components/link-text/link-text";
import '../login-page/login-page.scss';
import ValidateText from "../../components/validate-text/validate-text";
import FormFunctions from "../../tools/FormFunctions";
import Router from "../../tools/Router";
import {HTTPTransport} from "../../tools/Requests";

export default class RegisterPage extends FormFunctions {
    constructor() {
        super({
            title: new Title({text: "Registration"}),
            button: new ButtonComponent({
                text: "Register",
                events: {
                    click: (e: Event) => {
                        this.handleSubmit(e)
                    }
                }
            }),
            email: new Input({
                placeholder: "e-mail",
                className: "inputStyle",
                name: "email",
                title: "email",
                events: {
                    input: () => { this.changeInput("email")},
                    blur: (e) => this.validateEmail(e)
                }
            }),
            login: new Input({
                placeholder: "login",
                className: "inputStyle",
                name: "login",
                title: "login",
                events: {
                    input: () => { this.changeInput("login")},
                    blur: (e) => this.validateLogin(e)
                }
            }),
            name: new Input({
                placeholder: "name",
                className: "inputStyle",
                name: "first_name",
                title: "first_name",
                events: {
                    input: () => { this.changeInput("first_name")},
                    blur: (e) => this.validateName(e, "first_name")
                }
            }),
            secondName: new Input({
                placeholder: "second-name",
                className: "inputStyle",
                name: "second_name",
                title: "second_name",
                events: {
                    input: () => { this.changeInput("second_name")},
                    blur: (e) => this.validateName(e, "second_name")
                }
            }),
            phone: new Input({
                placeholder: "phone",
                className: "inputStyle",
                name: "phone",
                title: "phone",
                events: {
                    input: () => { this.changeInput("phone")},
                    blur: (e) => this.validatePhone(e)
                }
            }),
            password: new Input({
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
            confirmPassword: new Input({
                placeholder: "confirm password",
                className: "inputStyle",
                name: "confirm_password",
                type: "password",
                title: "confirm_password",
                events: {
                    input: () => { this.changeInput("confirm_password")},
                    blur: (e) => this.validatePassword(e)
                }
            }),
            errorText: new ValidateText({text: "incorrect data"}),
            link: new LinkText({
                text: "Login",
                events: {
                    click: (e: Event) => {
                        e.preventDefault();
                        this.navigateToLogin()
                    }
                }
            })
        })
    }
    router = new Router("app");

    httpTransport = new HTTPTransport()

    handleSubmit(event: Event) {
        event.preventDefault();
        const allIsValid = this.validateLogin(event)
            && this.validatePassword(event)
            && this.validateName(event, "first_name")
            && this.validateName(event, "second_name")
            && this.validatePhone(event)
            && this.validateEmail(event)
        const isCorrectPassword = this.inputField("password").value === this.inputField("confirm_password").value
        if(allIsValid && isCorrectPassword) {
            const formData = {
                first_name: this.inputField("first_name").value,
                second_name: this.inputField("second_name").value,
                login : this.inputField("login").value,
                email: this.inputField("email").value,
                password: this.inputField("password").value,
                phone: this.inputField("phone").value,
            }
            const options = {
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(formData)
            }
            const userOptions = {
                credentials: 'include',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            this.httpTransport.post('https://ya-praktikum.tech/api/v2/auth/signup', options)
                .then(response => {
                    console.log(formData)
                    if(response.status >= 200 && response.status < 300){
                        this.router.go("/messenger")
                        return this.httpTransport.get('https://ya-praktikum.tech/api/v2/auth/user', userOptions)
                    }else {
                        throw new Error('Failed to signup');
                    }
                })
                .then(userResponse => {
                    console.log('User data:', userResponse);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }else {
            this.errorElement().style.visibility = "initial"
        }
    }
    navigateToLogin () {
        this.router.go("/")
    }

    override render() {

        return `<form class="loginContent"> 
                <header>
                    {{{ title }}}
                </header>
                <div class="inputs">
                    {{{ email }}}
                    {{{ login }}}
                    {{{ name }}}
                    {{{ secondName }}}
                    {{{ phone }}}
                    {{{ password }}}
                    {{{ confirmPassword }}}
                </div>
                    {{{ errorText }}}
                <footer class="loginFooter">
                    {{{ button }}}
                    {{{ link }}}
                </footer>
            </form>`
    }
}
