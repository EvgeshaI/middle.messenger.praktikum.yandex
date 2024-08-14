import {expect} from 'chai';
import Sinon, {SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic} from 'sinon';
import {HTTPTransport} from './Requests';

describe('HTTPTransport', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let httpTransport: HTTPTransport;
    let requests: SinonFakeXMLHttpRequest[] = [];
    const BASE_URL = 'https://ya-praktikum.tech/api/v2';

    beforeEach(() => {
        xhr = Sinon.useFakeXMLHttpRequest();
        (global as any).XMLHttpRequest = xhr as any;
        xhr.onCreate = (request: SinonFakeXMLHttpRequest) => {
            requests.push(request);
        };
        httpTransport = new HTTPTransport('/');
    });

    afterEach(() => {
        xhr.restore();
        requests = [];
    });

    const testHttpMethod = (method: 'get' | 'put' | 'post') => {
        it(`should send a ${method.toUpperCase()} request`, () => {
            httpTransport[method](`${BASE_URL}/test`);
            const [currentRequest] = requests;

            expect(currentRequest.method).to.be.eq(method.toUpperCase());
            expect(currentRequest.url).to.be.eq(`${BASE_URL}/test`);
        });
    };

    testHttpMethod('get');
    testHttpMethod('put');
    testHttpMethod('post');
});
