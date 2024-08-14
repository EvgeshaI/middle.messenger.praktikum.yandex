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
        const profileUrl = new HTTPTransport('/user/profile').BASE_URL
        return this.httpTransport.put(profileUrl, {...this.options, data: JSON.stringify(formData)})
    }

    changePassword (formData: IPasswords) {
        const changePasswordUrl = new HTTPTransport('/user/password').BASE_URL
        return this.httpTransport.put(changePasswordUrl, {...this.options, data: JSON.stringify(formData)})
    }
    changeAvatar (formData: FormData) {
        const options = {
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }
        const changeAvatarUrl = new HTTPTransport('/user/profile/avatar').BASE_URL
        return this.httpTransport.put(changeAvatarUrl, {options, data: formData})
    }
}
