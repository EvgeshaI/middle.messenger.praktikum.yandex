export interface IInputPropsType {
    type?: string,
    title: string,
    name: string,
    placeholder: string,
    className?: string,
    events?: {
        input: () => void,
        blur: (e: Event) => void
    }
}
