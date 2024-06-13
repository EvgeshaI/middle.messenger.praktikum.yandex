import Handlebars from 'handlebars';
import './chat-page.scss';

export { default as ChatPage } from './chat-page.hbs?raw';


Handlebars.registerHelper('chat-page-group-list', () => {
    return [
        { name: 'Friends Forever', message: 'Hahahahah', unread: '4' , avatar: '', time: 'Today, 9.52pm'},
        { name: 'Mera Gang', message: 'Kyuuuuu???', avatar: '', time: 'Yesterday, 12.31pm'},
        { name: 'Hiking', message: 'It’s not going to happen' , avatar: '', time: 'Wednesday, 9.12am'},
    ]
});
Handlebars.registerHelper('chat-page-contact-list', () => {
    return [
        { name: 'Anil', message: 'April fool’s day', avatar: '', time: 'Today, 9.52pm'},
        { name: 'Chuuthiya', message: 'Baag', unread: '1', avatar: '', time: 'Today, 12.11pm'},
        { name: 'Mary ma’am', message: 'You have to report it...', unread: '1', avatar: '', time: 'Today, 2.40pm'},
        { name: 'Bill Gates', message: 'Nevermind bro', unread: '5', avatar: '', time: 'Yesterday, 12.31pm'},
        { name: 'Victoria H', message: 'Okay, brother. let’s see', unread: '1', avatar: '', time: 'Wednesday, 11.12am'},
    ]
});