export interface IImagePropsType {
    alt: string,
    url: any,
    className?: string,
    events?: {
        click: () => void
    }
}
