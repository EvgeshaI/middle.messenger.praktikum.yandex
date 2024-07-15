import './settings-input.scss';
import Input from "../input/input";
import FormFunctions from "../../tools/FormFunctions";
import {ISettingInputPropsType} from "./types";

export default class SettingsInput extends FormFunctions {
    constructor(props: ISettingInputPropsType) {
        super({
            ...props,
            settingInput: new Input({
                placeholder: props.placeholder,
                className: props.className,
                title: props.title,
                type: props.type,
                name: props.name,
                events: {
                    input: () => {props.onChange()},
                    blur: (e) => {props.onBlur(e)}
                }
            })
        })
    }
    render() {
        return `<div class="settingItem">
                    <div class="settingTitle">
                        {{ title }}
                    </div>
                    <div class="settingInput">
                        {{{ settingInput }}}
                    </div>
                </div>`
    }
}
