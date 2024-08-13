export interface IChatItemPropsType {
    id: number,
    name: string,
    message: string | null,
    unread: number | null,
    time: string,
    onClick: () => void

}
