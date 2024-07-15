import Block from "./Block";


export default class FormFunctions extends Block{
    inputField (nameAtr: string) {
        return this.element!.querySelector(`input[name=${nameAtr}]`) as HTMLInputElement;
    }
    errorElement () {
        return  this.element!.querySelector(`#error-text`)! as HTMLElement;
    }
    patternForLogin () {
        return /^(?=[a-zA-Z_-]*[a-zA-Z][a-zA-Z0-9_-]{2,19})[a-zA-Z0-9_-]{3,20}$/
    }
    patternForPassword () {
        return /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/
    }
    patternForName () {
        return /^[A-ZА-ЯЁ][a-zа-яё-]*$/
    }
    patternForEmail () {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    }
    patternForPhone () {
        return /^\+?\d{10,15}$/
    }

    changeInput (inputName: string) {
        this.errorElement().style.visibility = "hidden"
        this.inputField(inputName).style.borderColor = "#B4ABAB"
        this.inputField(inputName).style.color = "initial"
    }

    notCorrectlyValue (inputName: string) {
        this.inputField(inputName).style.borderColor = "#DF544D"
        this.inputField(inputName).style.color = "#DF544D"
    }

    validateLogin (event: Event): boolean {
        const result = this.validate(event, this.patternForLogin(), "login")
        if(!result){
            this.notCorrectlyValue("login")
        }
        return result
    }
    validatePassword (event: Event): boolean {
        const result = this.validate(event, this.patternForPassword(), "password")
        if(!result){
            this.notCorrectlyValue("password")
        }
        return result
    }
    validateName (event: Event, inputName: string) {
        const result =  this.validate(event, this.patternForName(), inputName)
        if(!result){
            this.notCorrectlyValue(inputName)
        }
        return result
    }
    validateEmail (event: Event) {
        const result = this.validate(event, this.patternForEmail(), "email")
        if(!result){
            this.notCorrectlyValue("email")
        }
        return result
    }
    validatePhone (event: Event) {
        const result = this.validate(event, this.patternForPhone(), "phone")
        if(!result){
            this.notCorrectlyValue("phone")
        }
        return result
    }

    validate (event: Event, pattern: RegExp, inputName: string):boolean {
        event.preventDefault();
        const value = this.inputField(inputName).value
        const result = pattern.test(value)
        if(!result) {
            this.errorElement().style.visibility = "initial"
        }
        return result
    }
}
