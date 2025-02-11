import { LightningElement,api,wire } from 'lwc';
import CREATE_OBJECT_NAME from '@salesforce/schema/Contact';
import CONTACT_FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import CONTACT_LAST_NAME from '@salesforce/schema/Contact.LastName';
import CONTACT_EMAIL from '@salesforce/schema/Contact.Email';
import CONTACT_PHONE from '@salesforce/schema/Contact.Phone';
import ACCOUNT_ID from '@salesforce/schema/Contact.AccountId';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import fetchRelatedContacts from '@salesforce/apex/SFDC_FetchRelatedContact.getMyContacts';
import createContact from '@salesforce/apex/CreateContact.createContactsUsingAccId';
import countContact from '@salesforce/apex/SFDC_FetchRelatedContact.contactCount';
import { refreshApex } from '@salesforce/apex'; 
import {notifyRecordUpdateAvailable } from 'lightning/uiRecordApi';
import LightningModal from 'lightning/modal';

const COLUMNS = [
    {label:'Account Id' , fieldName:'AccountId'},
    {label:'Last Name' , fieldName:'LastName'},
    {label:'First Name', fieldName:'FirstName'},
    {label:'Email' , fieldName:'Email'}
]
export default class ContactSaveForm extends LightningModal {
    isLoad = false;
    @api options = [];
    visible = true;
    isVisibleForm = false;
    isVisibleContactDetailForm = true;
    showSearchBar= true;
    data;
    error;
    @api recordId;
    searchKey ='';
    columns = COLUMNS;
    wiredContactResult;
    count;
    State= {
        contactName: CREATE_OBJECT_NAME,
        contactFirstName: CONTACT_FIRST_NAME,
        contactLastName: CONTACT_LAST_NAME,
        contactPhone: CONTACT_EMAIL,
        contactEmail: CONTACT_PHONE,
        contactAccountId: ACCOUNT_ID
    }
    AccountId ='001NS00000wUfnXYAS';
    FirstName ='';
    LastName ='';
    Phone ='';
    Email ='';
    handleChange(event){
        if(event.target.name == "FirstName"){
            this.FirstName = event.target.value;
        }
        if(event.target.name == "LastName"){
            this.LastName = event.target.value;
        }
        if(event.target.name == "Phone"){
            this.Phone = event.target.value;
        }
        if(event.target.name == "Email"){
            this.Email = event.target.value;
        }
    }

    @wire(fetchRelatedContacts,{accId: '001NS00000wUfnXYAS',searchKey:'$searchKey'})
    wiredContact(result) {
        this.wiredContactResult = result;
        const { data, error } = result;
        if (data) {
            this.data = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.data = undefined;
        }
    }

    ShowCreateForm(){
        // if(this.isLoad == false){
        //     this.showSearchBar = true;
        // }
        if(this.showSearchBar == true){
            this.showSearchBar = false;
        }
        if(this.isVisibleContactDetailForm == true){
            this.isVisibleContactDetailForm = false;
        }
        if(this.isVisibleForm == false){
            this.isVisibleForm = true;
        }else if(this.isVisibleForm == true){
            this.isVisibleForm = false;
        }

    }
    HideCreateForm(){
        this.visible = false;
    }

    handleSearch(event){
        this.searchKey = event.target.value;
    }

    async ShowContactFormAgain(){
        this.isLoad = true;
        setTimeout(() => {
            this.isLoad = false;
        }, 3000);
        if(this.Email != ''  && this.Email.includes('@') && this.Email.endsWith('.com') && this.LastName != ''){
            if(this.isVisibleForm == true){
                this.isVisibleForm = false;
            }
            if(this.isVisibleContactDetailForm == false){
                this.isVisibleContactDetailForm = true;
            }
            if(this.showSearchBar == false){
                this.showSearchBar = true;
            }
            this.dispatchEvent(
                new ShowToastEvent({
                    title:"Successfull",
                    message: "Contact Created",
                    variant: 'success'
                })
            );
           
            await countContact({accId: this.AccountId})
            .then(result => {
                this.count = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.accounts = undefined;
            })
            await createContact({firstName:this.FirstName ,lastName:this.LastName ,Phone:this.Phone ,Email:this.Email ,recordId: this.AccountId})
            .then(result => {
                refreshApex(this.wiredContactResult);
                this.accounts = result;
                this.error = undefined;
            })
            .catch(error => {
                this.error = error;
                this.accounts = undefined;
            })
            await notifyRecordUpdateAvailable([{recordId: this.recordId}]);
           
        }else{
            this.dispatchEvent(
                new ShowToastEvent({
                    title:"Error",
                    message: "Email not available or format not correct or lastname empty",
                    variant: 'error'
                })
            );
        }
    }
}