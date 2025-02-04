import { LightningElement } from 'lwc';

export default class ParentComponent extends LightningElement {
    message="Hello World!";
    handleChange(event){
        this.message = event.target.value;
    }
}