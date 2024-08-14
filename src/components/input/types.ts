export interface IInputPropsType {
    type?: string,
    title: string,
    name: string,
    value: string,
    placeholder: string,
    className?: string,
    events?: {
        input: (e?: any) => void,
        blur?: (e: Event) => void
    }
}
