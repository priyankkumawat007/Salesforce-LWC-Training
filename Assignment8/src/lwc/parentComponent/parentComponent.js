import { LightningElement,api } from 'lwc';

export default class ParentComponent extends LightningElement {
    createObjectName;
    Field;
    label;
    placeholder;
    showCombox = false;
    comboLabel = "Show Picklist";
    handleChange(event){
        if(event.target.name == 'ObjectApi'){
            this.createObjectName = event.target.value;
        }
        if(event.target.name == 'FieldApi'){
            this.Field = event.target.value;
        }
        if(event.target.name == 'Picklist'){
            this.label = event.target.value;
        }
        if(event.target.name == 'Placeholder'){
            this.placeholder = event.target.value;
        }
    }
    handlechange(){
        if(this.showCombox == false){
            this.showCombox = true;
            this.comboLabel = "Hide Picklist";
        }else if(this.showCombox == true){
            this.showCombox = false;
            this.comboLabel = "Show Picklist";
        }
    }
}