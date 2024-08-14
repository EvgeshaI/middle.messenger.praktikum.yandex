import {expect} from 'chai';
import Handlebars from 'handlebars';

const normalizeHTML = (html: string) => html.replace(/\s+/g, ' ').trim();

describe('Handlebars', () => {
    let template: HandlebarsTemplateDelegate;

    beforeEach(() => {
        const templateSource = `
      <div>
        <h1>{{title}}</h1>
        <p>{{message}}</p>
        {{#if isVisible}}
          <p>Visible</p>
        {{/if}}
        {{#each items}}
          <li>{{this}}</li>
        {{/each}}
      </div>
    `;
        template = Handlebars.compile(templateSource);
    });

    it('must process simple data correctly', () => {
        const context = {
            title: 'Hello',
            message: 'World',
            isVisible: true,
            items: ['Item 1', 'Item 2']
        };

        const result = normalizeHTML(template(context));
        const expected = `
      <div>
        <h1>Hello</h1>
        <p>World</p>
        <p>Visible</p>
        <li>Item 1</li>
        <li>Item 2</li>
      </div>
    `.trim();

        expect(result).to.equal(normalizeHTML(expected));
    });

    it('should hide the element when isVisible is false', () => {
        const context = {
            title: 'Hello',
            message: 'World',
            isVisible: false,
            items: ['Item 1', 'Item 2']
        };

        const result = normalizeHTML(template(context));
        const expected = `
      <div>
        <h1>Hello</h1>
        <p>World</p>
        <li>Item 1</li>
        <li>Item 2</li>
      </div>
    `.trim();

        expect(result).to.equal(normalizeHTML(expected));
    });

    it('should handle empty items array correctly', () => {
        const context = {
            title: 'Hello',
            message: 'World',
            isVisible: true,
            items: []
        };

        const result = normalizeHTML(template(context));
        const expected = `
      <div>
        <h1>Hello</h1>
        <p>World</p>
        <p>Visible</p>
      </div>
    `.trim();

        expect(result).to.equal(normalizeHTML(expected));
    });

    it('must correctly process data with errors', () => {
        const context = {
            title: 'Hello',
            message: null,
            isVisible: true,
            items: undefined
        };

        const result = normalizeHTML(template(context));
        const expected = `
      <div>
        <h1>Hello</h1>
        <p></p>
        <p>Visible</p>
      </div>
    `.trim();
        expect(result).to.equal(normalizeHTML(expected));
    });
});
