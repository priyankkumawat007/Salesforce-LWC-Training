import { LightningElement,api } from 'lwc';
import getAccountData from '@salesforce/apex/SFDC_FetchAccounts.getMyAllAccounts';

const columns = [
    { label: 'Name', fieldName: 'Name'},
    { label: 'Type', fieldName: 'Type'},
    { label: 'Phone', fieldName: 'Phone'},
    { label: 'Industry', fieldName: 'Industry'},
    { label: 'Website', fieldName: 'Website'}
];

export default class BasicDatatable extends LightningElement {
    data = [];
    columns = columns;
    // @api recordId = '001NS00000wUfnXYAS';
    connectedCallback() {
        getAccountData ()
        .then(result => {
            this.data = result;
        }).catch(error=>{
            this.data = undefined;
        })
    }
}