
export interface ISettingInputPropsType {
    placeholder: string,
    className?: string,
    title: string,
    type?: string,
    name: string,
    value: string
    onChange: () => void,
    onBlur: (e:Event) => void
}
