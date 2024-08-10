import './user-settings.scss'
import Navbar from "../../components/navbar/navbar";
import Avatar from "../../components/avatar/avatar";
import ImageComponent from "../../components/image/image";
import SettingsInput from "../../components/settings-input/settings-input";
import ButtonComponent from "../../components/button/button";
import FormFunctions from "../../tools/FormFunctions";
import ValidateText from "../../components/validate-text/validate-text";
import ApiServiceSettings from "./apiSettings";
import store, {IUser, State} from "../../tools/Store";
import Input from "../../components/input/input";

export default class UserSettingsPage extends FormFunctions {
    constructor() {
        super({
            navbar: new Navbar({
                url : ""
            }),
            avatar: new Avatar({
                url: ""
            }),
            photoImg: new ImageComponent({
                alt: "camera",
                url: "../../static/svg/camera.svg",
                onClick: () => console.log("load photo")
            }),
            inputAvatar: new Input({
                type: "file",
                title: "file",
                name: "avatar",
                value: "",
                placeholder: "",
                className: "inputFileAvatar",
                events: {
                    input: (e) => this.changeAvatar(e)
                }
            }),
            nameInput: new SettingsInput({
                title: "Name",
                placeholder: "name",
                name: "first_name",
                value: "",
                onChange: () => {this.changeInput("first_name")},
                onBlur: (e) => {this.validateName(e, "first_name")}
            }),
            secondNameInput: new SettingsInput({
                title: "Second Name",
                placeholder: "second name",
                name: "second_name",
                value: "",
                onChange: () => {this.changeInput("second_name")},
                onBlur: (e) => {this.validateName(e, "second_name")}
            }),
            displayNameInput: new SettingsInput({
                title: "Display Name",
                placeholder: "nike-name",
                name: "display_name",
                value: "",
                onChange: () => {this.changeInput("display_name")},
                onBlur: (e) => {
                    const target = e.target as HTMLInputElement
                    console.log(target.value)
                }
            }),
            emailInput: new SettingsInput({
                title: "Email",
                placeholder: "email.@mail.com",
                name: "email",
                value: "",
                onChange: () => {this.changeInput("email")},
                onBlur: (e) => {this.validateEmail(e)}
            }),
            loginInput: new SettingsInput({
                title: "Login",
                placeholder: "login",
                name: "login",
                value: "",
                onChange: () => {this.changeInput("login")},
                onBlur: (e) => {this.validateLogin(e)}
            }),
            phoneInput: new SettingsInput({
                title: "Phone",
                placeholder: "+123345678",
                name: "phone",
                value: "",
                onChange: () => {this.changeInput("phone")},
                onBlur: (e) => {this.validatePhone(e)}
            }),
            oldPasswordInput: new SettingsInput({
                title: "Old Password",
                placeholder: "",
                type: "password",
                name: "oldPassword",
                value: "",
                onChange: () => {this.changeInput("password")},
                onBlur: () => {}
            }),
            newPasswordInput: new SettingsInput({
                title: "New Password",
                placeholder: "",
                type: "password",
                name: "password",
                value: "",
                onChange: () => {this.changeInput("password")},
                onBlur: (e) => {this.validatePassword(e)}
            }),
            errorText: new ValidateText({text: "incorrect data"}),
            confirmPasswordText: new ValidateText({
                text: "password was changed",
                isConfirmPassword: true
            }),
            saveUserInfoButton: new ButtonComponent({
                text: "Save info",
                events: {
                    click: (e: Event) => {
                        this.handleSubmitUserInfo(e)
                    }
                }
            }),
            savePasswordButton: new ButtonComponent({
                text: "Save new password",
                events: {
                    click: (e: Event) => {
                        this.handleSubmitNewPassword(e)
                    }
                }
            }),

        })
    }
    apiService = new ApiServiceSettings();

    componentDidUpdate (oldProps: State, newProps: State) {
        if (oldProps.user !== newProps.user){
            const user = newProps.user
            if(user){
                this.children.nameInput.setProps({value: user.first_name})
                this.children.secondNameInput.setProps({value: user.second_name})
                this.children.displayNameInput.setProps({value: user.display_name})
                this.children.emailInput.setProps({value: user.email})
                this.children.loginInput.setProps({value: user.login})
                this.children.phoneInput.setProps({value: user.phone})
                this.children.avatar.setProps({url: `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`})
                this.children.navbar.setProps({url: `https://ya-praktikum.tech/api/v2/resources/${user.avatar}`})
            }
        }
        return true
    }

    handleSubmitUserInfo(event: Event) {
        event.preventDefault();
        const allIsValid = this.validateLogin(event)
            && this.validateName(event, "first_name")
            && this.validateName(event, "second_name")
            && this.validatePhone(event)
            && this.validateEmail(event)
        if(allIsValid) {
            const formData = {
                first_name: this.inputField("first_name").value,
                second_name: this.inputField("second_name").value,
                display_name: this.inputField("display_name").value,
                email: this.inputField("email").value,
                phone: this.inputField("phone").value,
                login : this.inputField("login").value,
            }
            this.apiService.changeUserProfile(formData).then(r => {
                const xhr = r as XMLHttpRequest;
                if(xhr.status  >= 200 && xhr.status < 300){
                    const userInfo = JSON.parse(xhr.responseText) as IUser;
                    localStorage.setItem("user", xhr.responseText)
                    store.dispatch({
                        type: 'SET_USER',
                        user: userInfo
                    });
                }
            })
        }else {
            this.errorElement().style.visibility = "initial"
        }
    }
    handleSubmitNewPassword (event: Event) {
        event.preventDefault();
        const isValidPassword = this.validatePassword(event)
        if(isValidPassword){
            const formData = {
                oldPassword: this.inputField("oldPassword").value,
                newPassword: this.inputField("password").value,
            }
            this.apiService.changePassword(formData).then(r => {
                const xhr = r as XMLHttpRequest;
                if(xhr.status  >= 200 && xhr.status < 300){
                    const confirmText = this.element!.querySelector(`#confirmPassword`)! as HTMLElement;
                    confirmText.style.visibility = "initial"
                }
            })
        }
    }
    changeAvatar(e: Event) {
        const input = e.target as HTMLInputElement;
        if (input.files && input.files![0]) {
            const file = input.files![0];
            const formData = new FormData();
            formData.append("avatar", file);

            this.apiService.changeAvatar(formData).then(r => {
                const xhr = r as XMLHttpRequest;
                if(xhr.status  >= 200 && xhr.status < 300){
                    const userInfo = JSON.parse(xhr.responseText) as IUser;
                    localStorage.setItem("user", JSON.stringify(userInfo))
                    store.dispatch({
                        type: 'SET_USER',
                        user: userInfo
                    });
                }
            });
        }
    }
    override render() {
        return `<main class="settingsContainer">
                    {{{ navbar }}}
                    <div class="settings">
                        <form class="settingsBlock">
                            <div class="settingAvatar">
                                {{{ avatar }}}
                                <label class="customFileAvatar">
                                    {{{ inputAvatar }}}
                                    {{{ photoImg }}}
                                </label>
                            </div>
                            <div class="userInfo">
                                {{{ nameInput }}}
                                {{{ secondNameInput }}}
                                {{{ displayNameInput }}}
                                {{{ emailInput }}}
                                {{{ loginInput }}}
                                {{{ phoneInput }}}
                            </div>
                            {{{ saveUserInfoButton }}}
                            <div class="passwordSetting">
                                {{{oldPasswordInput}}}
                                {{{newPasswordInput}}}
                            </div>
                            {{{ errorText }}}
                            {{{ confirmPasswordText }}}
                            {{{ savePasswordButton }}}
                        </form>
                    </div>
                </main>`
    }
}
