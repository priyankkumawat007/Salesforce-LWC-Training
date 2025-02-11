import { LightningElement,wire,api,track } from 'lwc';
import getAccountData from '@salesforce/apex/SFDC_FetchAccounts.getMyAccountsData';
import OBJECT_API from '@salesforce/schema/Account';
import OBJECT_NAME from '@salesforce/schema/Account.Name';
import OWNER_ID from '@salesforce/schema/Account.OwnerId';
import DESCRIPTION from '@salesforce/schema/Account.Description';
import CONTACT_COUNT from '@salesforce/schema/Account.Active_Contacts__c';
import MyModal from "c/contactSaveForm";

export default class AccountManagerWizard extends LightningElement {
    State= {
        objectApiAccount: OBJECT_API,
        name: OBJECT_NAME,
        ownerId: OWNER_ID,
        description: DESCRIPTION,
        count: CONTACT_COUNT,
    }
    visible = false;
    isVisibleContactTable = false;
    createContactButtonValue = "Show Contacts";
    error;
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

    @wire(getAccountData,{recordId:'001NS00000wUfnXYAS'})
    wiredAccount({data,error}){
        if(data){
            this.data = data;
            console.log(this.data.Name);
            console.log(this.data.OwnerId);
            

        }else if(error){
            this.error = error;
        }
    }

    ShowCreateFormModel(){
        MyModal.open({
            
          }).then((result) => {
              console.log(result);
          });
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