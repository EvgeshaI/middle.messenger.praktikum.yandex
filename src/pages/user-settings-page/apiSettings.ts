import {HTTPTransport} from "../../tools/Requests";

export interface IUserInfo {
    first_name: string,
    second_name: string,
    display_name: string,
    phone: string,
    login: string,
    email: string
}

export interface IPasswords {
    oldPassword: string,
    newPassword: string,
}

export default class ApiServiceSettings {
    httpTransport = new HTTPTransport();
    options = {
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    }
    changeUserProfile (formData: IUserInfo) {
        return this.httpTransport.put('https://ya-praktikum.tech/api/v2/user/profile', {...this.options, data: JSON.stringify(formData)})
    }

    changePassword (formData: IPasswords) {
        return this.httpTransport.put('https://ya-praktikum.tech/api/v2/user/password', {...this.options, data: JSON.stringify(formData)})
    }
    changeAvatar (formData: FormData) {
        const options = {
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        return this.httpTransport.put('https://ya-praktikum.tech/api/v2/user/profile/avatar', {options, data: formData})
    }
}
