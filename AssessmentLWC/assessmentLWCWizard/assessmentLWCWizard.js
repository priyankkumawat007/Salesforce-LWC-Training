import { LightningElement,wire,api,track } from 'lwc';
import{ShowToastEvent} from 'lightning/platformShowToastEvent';
import fetchAccounts from '@salesforce/apex/SFDC_FetchAccounts.getAllAccounts';
import Account_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone_Number__c';
import WEBSITE_FIELD from '@salesforce/schema/Account.Website';
import MyModal from "c/assessmentLWCWizard";
const columns = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone'},
    { label: 'Website', fieldName: 'Website'} 
];

export default class AccountManagerWizard extends LightningElement {
    Contact_Object = Account_OBJECT;
    Name = NAME_FIELD;
    Phone_Number__c = PHONE_FIELD;
    Website = WEBSITE_FIELD;
    data = [];
    columns = columns;
    visible = false;
    isVisibleContactTable = false;
    createContactButtonValue = "Show Contacts";
    error;
    @api accountId;
    @api recordId;
    handleClickAccountManagerWizard(){
        if(this.visible == false){
            this.visible = true;
        }else if(this.visible == true){
            this.visible = false;
        }
    } 
    hideModel(){
        if(this.visible == true){
            this.visible = false;
        }
    }
    @wire(fetchAccounts)
        wiredAccount(result) {
            const { data, error } = result;
            if (data) {
                this.data = data;
                this.error = undefined;
            } else if (error) {
                this.error = error;
                this.data = undefined;
            }
        }

    async handleSuccess(event){
        this.accountId = event.detail.id
            const toastEvent = new ShowToastEvent({
                    title : 'Success',
                    message : 'Your Contact has been added successfully' ,
                    varient : 'success'
            });
        this.dispatchEvent(toastEvent);
        const result = await  MyModal.open({
              size : 'large',
        }).then((result) => {
                console.log(result);
        });
    }

    handleError(event){
        let errorMessage = event.detail.detail;
            console.log("response",errorMessage);
            this.dispatchEvent(
        new ShowToastEvent({
            title: 'Error',
            message: errorMessage,
            variant: 'error'
        })
    );
}

    handleVisibleContactTable(){
        if(this.isVisibleContactTable == false){
            this.isVisibleContactTable = true;
            this.createContactButtonValue = "Hide Contacts";
        }
        else if(this.isVisibleContactTable == true){
            this.isVisibleContactTable = false;
            this.createContactButtonValue = "Show Contacts";
        }
    }
}