import {HTTPTransport} from "../../tools/Requests";

export interface IAddChat {
    title: string
}
export interface IFindUser {
    login: string
}
export interface IUsersInChat {
    users: Array<number>,
    chatId: number
}
export interface IDeleteChat {
    chatId: number
}

export default class ApiServiceChat {
    httpTransport = new HTTPTransport();
    options = {
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    getChats () {
        const params = {
            offset: 0,
            limit: 15,
            title: ""
        }
        const chatsUrl = new HTTPTransport('/chats').BASE_URL
        return this.httpTransport.get(chatsUrl, {...this.options, data: params})
    }
    addNewChat (formData: IAddChat) {
        const chatsUrl = new HTTPTransport('/chats').BASE_URL
        return this.httpTransport.post(chatsUrl, {... this.options, data: JSON.stringify(formData)})
    }
    getToken (chatId: number) {
        const tokenUrl = new HTTPTransport(`/chats/token/${chatId}`).BASE_URL
        return this.httpTransport.post(tokenUrl, {... this.options})
    }
    findUserRequest (formData: IFindUser) {
        const searchUrl = new HTTPTransport(`/user/search`).BASE_URL
        return this.httpTransport.post(searchUrl, {... this.options, data: JSON.stringify(formData)})
    }
    addUserToChat (usersRequest: IUsersInChat) {
        const usersUrl = new HTTPTransport(`/chats/users`).BASE_URL
        return this.httpTransport.put(usersUrl, {... this.options, data: JSON.stringify(usersRequest)})
    }
    getUsersInChat (chatId: number) {
        const params = {
            offset: 0,
            limit: 15,
            name: "",
            email: ""
        }
        const usersInChatUrl = new HTTPTransport(`/chats/${chatId}/users`).BASE_URL
        return this.httpTransport.get(usersInChatUrl, {... this.options, data: params})
    }
    deleteUsers (data: IUsersInChat) {
        const usersUrl = new HTTPTransport(`/chats/users`).BASE_URL
        return this.httpTransport.delete(usersUrl, {... this.options, data: JSON.stringify(data)})
    }
    deleteChat (data: IDeleteChat) {
        const deleteChatUrl = new HTTPTransport(`/chats`).BASE_URL
        return this.httpTransport.delete(deleteChatUrl, {... this.options, data: JSON.stringify(data)})
    }
}
