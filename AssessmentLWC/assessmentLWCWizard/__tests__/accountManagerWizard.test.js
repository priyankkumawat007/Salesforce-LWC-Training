import { createElement } from 'lwc';
import MyComponent from 'c/accountManagerWizard';

describe('c-account-manager-wizard', () => {
    const element = createElement('c-account-manager-wizard',{
        is:MyComponent
    })
    document.body.appendChild(element);

    test('renders the component correctly', () => {
        const button = element.shadowRoot.querySelector('lightning-button');
        expect(button).not.toBeNull();
        expect(button.label).toBe('Account Manager Wizard');
    });
});