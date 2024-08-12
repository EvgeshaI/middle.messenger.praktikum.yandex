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
    // baseUrl = this.httpTransport.BASE_URL
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
        const loginUrl = new HTTPTransport('/auth/signin').BASE_URL
        return this.httpTransport.post(loginUrl, {...options, data: JSON.stringify(formData)});
    }

    register(formData: IRegisterFormData) {
        const registerUrl = new HTTPTransport('/auth/signup').BASE_URL
        return this.httpTransport.post(registerUrl, {...this.options, data: JSON.stringify(formData)})
    }

    getUser() {
        const userUrl = new HTTPTransport('/auth/user').BASE_URL
        return this.httpTransport.get(userUrl, this.options);
    }
}
