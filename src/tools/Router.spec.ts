import {expect} from 'chai';
import {JSDOM} from 'jsdom';
import Router from "./Router";

describe('Checking the routers transitions', () => {
    let router: Router;
    let jsdom: JSDOM;

    before(() => {
        jsdom = new JSDOM('<!DOCTYPE html><div id="app"></div>', { url: "http://localhost" });
        (global as any).window = jsdom.window as unknown as Window & typeof globalThis;
        (global as any).document = jsdom.window.document;
        (global as any).history = jsdom.window.history;
    });

    beforeEach(() => {
        class TestComponent {
            getContent() {
                const div = document.createElement('div');
                div.innerHTML = 'Test Component';
                return div;
            }
        }
        router = new Router('app');

        router.use('/login', TestComponent );
        router.use('/register', TestComponent);
    });

    afterEach(() => {
        window.history.replaceState(null, '', '/');
    });

    it('Going to a new page should change the state of the history entity', () => {
        router.go('/login');
        expect(window.location.pathname).to.eq('/login');

        router.go('/register');
        expect(window.location.pathname).to.eq('/register');

        expect(window.history.length).to.eq(3);
    });

    after(() => {
        jsdom.window.close();
    });
});
