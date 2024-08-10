import Title from "../../../components/title/title";
import ButtonComponent from "../../../components/button/button";
import Input from "../../../components/input/input";
import LinkText from "../../../components/link-text/link-text";
import '../login-page/login-page.scss';
import ValidateText from "../../../components/validate-text/validate-text";
import FormFunctions from "../../../tools/FormFunctions";
import Router from "../../../tools/Router";
import ApiService from "../apiLogin";
import store, {IUser} from "../../../tools/Store";

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
                value: "",
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
                value: "",
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
                value: "",
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
                value: "",
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
                value: "",
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
                value: "",
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
                value: "",
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
    apiService = new ApiService();

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
            this.apiService.register(formData)
                .then(response => {
                    const res = response as Response
                    if (this.apiService.isResponseStatus(res.status)) {
                        return this.apiService.getUser();
                    } else {
                        throw new Error('Failed to signup');
                    }
                })
                .then(userResponse => {
                    const xhr = userResponse as XMLHttpRequest;
                    if (this.apiService.isResponseStatus(xhr.status)) {
                        const userInfo = JSON.parse(xhr.responseText) as IUser;
                        localStorage.setItem("user", xhr.responseText)
                        store.dispatch({
                            type: 'SET_USER',
                            user: userInfo
                        });
                        this.router.go("/messenger");
                    }
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
