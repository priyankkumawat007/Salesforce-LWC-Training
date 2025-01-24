import { LightningElement,wire,api } from 'lwc';
import fetchCases from '@salesforce/apex/SFDC_FetchCaseData.getMyCases';
import {NavigationMixin} from "lightning/navigation";

    const COLUMNS =[
        {label:'Case Number',fieldName:'CaseNumber'},
        {label:'Subject',fieldName:'Subject'},
        {label:'Status',fieldName:'Status'},
        {label:'Phone Number',fieldName:'ContactPhone'},
        {label:'Email',fieldName:'ContactEmail'},
    ];
export default class CustomDataTable extends LightningElement {
    columns= COLUMNS;
    caseData=[];
    error;
    record;
  @api recordId;
  @api headerType;
  @api statusFilter;
  @wire (fetchCases, {statusVal: '$statusFilter', recordId:'$recordId'})
  wiredAccount({error,data}){
    if(data){
        this.caseData = data;
        this.error = undefined;

    }else if(error){
        this.error=error;
        this.caseData=undefined;
    }
  }
  handleFunction(event){
    var selectRows = event.detail.selectRows;
    this.record = selectRows[0];
    if(this.record.Id){
        this.navigateToRecordViewPage(this.record.Id);
    }
  }
  navigateToRecordViewPage(recordIds){
    this[NavigationMixin.Navigate]({
        type:'standard_recordPage',
        attribute:{
            recordId: recordIds,
            objectApiName:'Account',
            actionName:'View'
        }
    })
  }
}