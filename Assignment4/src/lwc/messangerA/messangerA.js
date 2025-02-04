import { LightningElement,wire } from 'lwc';
import { publish, MessageContext,subscribe,unsubscribe } from 'lightning/messageService';
import MESSAGE_UPDATING_CHANNEL from '@salesforce/messageChannel/messanger__c';
export default class MessangerA extends LightningElement {
    @wire(MessageContext)
    messagecontext;
    messagepass='';
    handleClick(event){
        this.messagepass = event.target.value;
    }
    handleSend(event){
        const payload = {
            messageAtoB : this.messagepass
        };
        publish(this.messagecontext,MESSAGE_UPDATING_CHANNEL,payload);
    }
    @wire(MessageContext)
    messagecontexts;
    messageFromB;
    subscription = null;
    connectedCallback(){
        this.subscribeToMessageChannel();
    }
    subscribeToMessageChannel(){
        if(!this.subscription){
            this.subscription = subscribe(
                this.messagecontexts,
                MESSAGE_UPDATING_CHANNEL,
                (message) => {
                    this.messageFromB = message.messageBtoA;
                }
            );
        } 
    }
    disconnectedCallback(){
            this.handleUnsubscribe();
        }
    handleUnsubscribe(){
        unsubscribe(this.subscription);
        this.subscription =null ;
    }
}