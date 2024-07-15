export interface ILinkTextPropsType {
    text: string,
    events: {
        click: (e: Event) => void
    }
}
