import Handlebars from 'handlebars';
import * as Components from './components/index.js'
import * as Pages from './pages/index.js';

const pages = {
    'login': [ Pages.LoginPage ],
    'register': [Pages.RegistrerPage],
    'chat': [Pages.ChatPage],
    'user-settings': [Pages.UserSettings],
    'error-page': [Pages.ErrorPage],
    'notfound-page': [Pages.NotFoundPage]
};

Object.entries(Components).forEach(([ name, component ]) => {
    Handlebars.registerPartial(name, component);
});

function navigate(page) {
    const [ source, args ] = pages[page];
    const handlebarsFunc = Handlebars.compile(source);
    document.body.innerHTML = handlebarsFunc(args);
}

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', e => {
    const page = e.target.getAttribute('page');
    if (page) {
        navigate(page);
        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
