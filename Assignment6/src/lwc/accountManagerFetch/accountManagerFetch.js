import { LightningElement,api,wire} from 'lwc';
import getContactData from "@salesforce/apex/SFDC_FetchRelatedContact.getMyContacts";
const columns =[
    {label : 'First Name', fieldName : 'FirstName'},
    {label : 'Last Name', fieldName : 'LastName'},
    {label : 'Phone', fieldName : 'Phone'},
    {label : 'Email', fieldName : 'Email'},
    {label : 'Account Id', fieldName : 'AccountId'}
]
export default class AccountManagerFetch extends LightningElement {
    data;
    columns = columns;
    @api recordId;
    @wire(getContactData,{accId :"$recordId"})
    wiredContacts({data, error}){
        if(data){
            this.data = data;
        }
        if(error){
            this.data = undefined;
        }
    }
}