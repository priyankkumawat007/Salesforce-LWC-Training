import { LightningElement, wire} from 'lwc';
import { subscribe, MessageContext,publish, unsubscribe} from 'lightning/messageService';
import MESSAGE_UPDATING_CHANNEL from '@salesforce/messageChannel/messanger__c';

export default class MessangerB extends LightningElement {
    messageFromA;
    subscription = null;
    @wire(MessageContext)
    messagecontext;
    connectedCallback(){
        this.subscribeToMessageChannel();
    }
    subscribeToMessageChannel(){
        if(!this.subscription){
            this.subscription = subscribe(
                this.messagecontext,
                MESSAGE_UPDATING_CHANNEL,
                (message) => {
                    this.messageFromA = message.messageAtoB;
                }
            );
        }
    }
    disconnectedCallback(){
        this.handleUnsubscribe();
    }
    handleUnsubscribe(){
        unsubscribe(this.subscription);
        this.subscription = null ;
    }
    @wire(MessageContext)
    messagecontexts;
    messagepass;
    handleClick(event){
        this.messagepass = event.target.value;
    }
    handleSend(event){
        const payload = {
            messageBtoA : this.messagepass
        };
        publish(this.messagecontexts,MESSAGE_UPDATING_CHANNEL,payload);
    }
}