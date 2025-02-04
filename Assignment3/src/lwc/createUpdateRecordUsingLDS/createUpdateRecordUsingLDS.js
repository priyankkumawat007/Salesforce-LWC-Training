import { LightningElement,api } from 'lwc';
import OBJECT_API from '@salesforce/schema/Account';
import OBJECT_NAME from '@salesforce/schema/Account.Name';
import PHONE from '@salesforce/schema/Account.Phone';
import COMPANY from '@salesforce/schema/Account.Website';
import EMAIL from '@salesforce/schema/Account.Industry';
import CREATE_OBJECT_NAME from '@salesforce/schema/Contact';
import CONTACT_FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import CONTACT_LAST_NAME from '@salesforce/schema/Contact.LastName';
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email';
import CONTACT_PHONE from '@salesforce/schema/Contact.Phone';
import ACCOUNT_ID from '@salesforce/schema/Contact.AccountId';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
export default class CreateUpdateRecordUsingLDS extends LightningElement {
    isvisible = false;
    @api recordId;
    State= {
        objectApiAccount: OBJECT_API,
        name: OBJECT_NAME,
        phone: PHONE,
        company: COMPANY,
        email: EMAIL,
        contactName: CREATE_OBJECT_NAME,
        contactFirstName: CONTACT_FIRST_NAME,
        contactLastName: CONTACT_LAST_NAME,
        contactPhone: CONTACT_EMAIL,
        contactEmail: CONTACT_PHONE,
        contactAccountId: ACCOUNT_ID
    }
    handleCreateContact(){
        if(this.isvisible == false){
            	this.isvisible = true;
        }
    }
    handleClickSubmit(){
        if(this.isvisible == true){
            this.isvisible = false;
        }
        this.dispatchEvent(
            new ShowToastEvent({
                title:"Successfull",
                message: "Contact Created",
                variant: 'success'

            })
        );
    }
}