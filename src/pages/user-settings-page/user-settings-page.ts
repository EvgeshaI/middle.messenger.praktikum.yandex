import './user-settings.scss'
import Navbar from "../../components/navbar/navbar";
import Avatar from "../../components/avatar/avatar";
import ImageComponent from "../../components/image/image";
import SettingsInput from "../../components/settings-input/settings-input";
import ButtonComponent from "../../components/button/button";
import FormFunctions from "../../tools/FormFunctions";
import ValidateText from "../../components/validate-text/validate-text";

export default class UserSettingsPage extends FormFunctions {
    constructor() {
        super({
            navbar: new Navbar(),
            avatar: new Avatar(),
            photoImg: new ImageComponent({
                alt: "camera",
                url: "../../static/svg/camera.svg"
            }),
            nameInput: new SettingsInput({
                title: "Name",
                placeholder: "name",
                name: "first_name",
                onChange: () => {this.changeInput("first_name")},
                onBlur: (e) => {this.validateName(e, "first_name")}
            }),
            secondNameInput: new SettingsInput({
                title: "Second Name",
                placeholder: "second name",
                name: "second_name",
                onChange: () => {this.changeInput("second_name")},
                onBlur: (e) => {this.validateName(e, "second_name")}
            }),
            displayNameInput: new SettingsInput({
                title: "Display Name",
                placeholder: "nike-name",
                name: "display_name",
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
                onChange: () => {this.changeInput("email")},
                onBlur: (e) => {this.validateEmail(e)}
            }),
            loginInput: new SettingsInput({
                title: "Login",
                placeholder: "login",
                name: "login",
                onChange: () => {this.changeInput("login")},
                onBlur: (e) => {this.validateLogin(e)}
            }),
            phoneInput: new SettingsInput({
                title: "Phone",
                placeholder: "+123345678",
                name: "phone",
                onChange: () => {this.changeInput("phone")},
                onBlur: (e) => {this.validatePhone(e)}
            }),
            oldPasswordInput: new SettingsInput({
                title: "Old password",
                placeholder: "",
                type: "password",
                name: "oldPassword",
                onChange: () => {this.changeInput("oldPassword")},
                onBlur: (e) => {
                    const target = e.target as HTMLInputElement
                    console.log(target.value)
                }
            }),
            newPasswordInput: new SettingsInput({
                title: "New Password",
                placeholder: "",
                type: "password",
                name: "password",
                onChange: () => {this.changeInput("password")},
                onBlur: (e) => {this.validatePassword(e)}
            }),
            confirmPasswordInput: new SettingsInput({
                title: "Confirm new password",
                placeholder: "",
                type: "password",
                name: "newPassword",
                onChange: () => {this.changeInput("newPassword")},
                onBlur: (e) => {this.validatePassword(e)}
            }),
            errorText: new ValidateText({text: "incorrect data"}),
            saveButton: new ButtonComponent({
                text: "Save",
                events: {
                    click: (e: Event) => {
                        this.handleSubmit(e)
                    }
                }
            })
        })
    }

    handleSubmit(event: Event) {
        event.preventDefault();
        const allIsValid = this.validateLogin(event)
            && this.validatePassword(event)
            && this.validateName(event, "first_name")
            && this.validateName(event, "second_name")
            && this.validatePhone(event)
            && this.validateEmail(event)
        const isCorrectPassword = this.inputField("password").value === this.inputField("newPassword").value
        console.log(allIsValid && isCorrectPassword)
        if(allIsValid && isCorrectPassword) {
            const formData = {
                firstName: this.inputField("first_name").value,
                secondName: this.inputField("second_name").value,
                email: this.inputField("email").value,
                phone: this.inputField("phone").value,
                login : this.inputField("login").value,
                newPassword: this.inputField("password").value,
            }
            console.log(formData)
        }else {
            this.errorElement().style.visibility = "initial"
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
                                    <input class="inputFileAvatar" type="file" name="avatar">
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
                            <div class="passwordSetting">
                                {{{oldPasswordInput}}}
                                {{{newPasswordInput}}}
                                {{{confirmPasswordInput}}}
                            </div>
                            {{{ errorText }}}
                            {{{ saveButton }}}
                        </form>
                    </div>
                </main>`
    }
}
