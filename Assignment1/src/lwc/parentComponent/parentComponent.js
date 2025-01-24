import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    message="Hello World!";
    handleChange(event){
        console.log('Hii');
        this.message = event.target.value;
    }
}