export interface IButtonPropsType {
    text: string,
    events: {
        click: (e: Event) => void
    }
}
