import { LightningElement, api, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';

export default class DynamicPicklist extends LightningElement {
    @api objectApiName;
    @api fieldApiName;
    @api label;
    @api placeholder;
    picklistOptions = [];
    error;
    @wire(getObjectInfo, { objectApiName: '$objectApiName' })
    objectInfo;
    @wire(getPicklistValues, {recordTypeId: '$recordTypeId',fieldApiName: '$fieldApiNameWithObject'})
    wiredPicklistValues({ error, data }) {
        if (data) {
            this.picklistOptions = data.values.map(item => ({ 
                label: item.label,
                value: item.value
            }));
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.picklistOptions = [];
        }
    }
    get recordTypeId() {
        return this.objectInfo.data?.defaultRecordTypeId;
    }
    get fieldApiNameWithObject() {
        return `${this.objectApiName}.${this.fieldApiName}`;
    } 
}