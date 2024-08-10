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
        return this.httpTransport.get('https://ya-praktikum.tech/api/v2/chats', {...this.options, data: params})
    }
    addNewChat (formData: IAddChat) {
        return this.httpTransport.post('https://ya-praktikum.tech/api/v2/chats', {... this.options, data: JSON.stringify(formData)})
    }
    getToken (chatId: number) {
        return this.httpTransport.post(`https://ya-praktikum.tech/api/v2/chats/token/${chatId}`, {... this.options})
    }
    findUserRequest (formData: IFindUser) {
        return this.httpTransport.post('https://ya-praktikum.tech/api/v2/user/search', {... this.options, data: JSON.stringify(formData)})
    }
    addUserToChat (usersRequest: IUsersInChat) {
        return this.httpTransport.put('https://ya-praktikum.tech/api/v2/chats/users', {... this.options, data: JSON.stringify(usersRequest)})
    }
    getUsersInChat (chatId: number) {
        const params = {
            offset: 0,
            limit: 15,
            name: "",
            email: ""
        }
        return this.httpTransport.get(`https://ya-praktikum.tech/api/v2/chats/${chatId}/users`, {... this.options, data: params})
    }
    deleteUsers (data: IUsersInChat) {
        return this.httpTransport.delete(`https://ya-praktikum.tech/api/v2/chats/users`, {... this.options, data: JSON.stringify(data)})
    }
}
