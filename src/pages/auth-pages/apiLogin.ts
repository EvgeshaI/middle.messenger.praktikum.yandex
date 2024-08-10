import {HTTPTransport} from "../../tools/Requests";

export interface ILoginFormData {
    login: string,
    password: string
}
export interface IRegisterFormData {
    first_name: string,
    second_name: string,
    login: string,
    email: string,
    password: string,
    phone: string
}

export default class ApiService {
    httpTransport = new HTTPTransport();
    options = {
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    };

    isResponseStatus(status: number): boolean {
        return status >= 200 && status < 300;
    }

    login(formData: ILoginFormData) {
        const options = {
            credentials: 'include',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        return this.httpTransport.post('https://ya-praktikum.tech/api/v2/auth/signin', {...options, data: JSON.stringify(formData)});
    }

    register(formData: IRegisterFormData) {
        return this.httpTransport.post('https://ya-praktikum.tech/api/v2/auth/signup', {...this.options, data: JSON.stringify(formData)})
    }

    getUser() {
        return this.httpTransport.get('https://ya-praktikum.tech/api/v2/auth/user', this.options);
    }
}
