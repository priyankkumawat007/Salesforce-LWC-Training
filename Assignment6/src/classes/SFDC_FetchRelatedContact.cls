public with sharing class SFDC_FetchRelatedContact {
	@AuraEnabled(cacheable=true)
    public static List<Contact> getMyContacts (String accId){
        List<Contact> listOfCon = [SELECT Id, AccountId, FirstName, LastName, Phone, Email
				   FROM Contact Where AccountId =: accId];
        if(!listOfCon.isEmpty()){
            return listOfCon;
        }
		return null;
    } 
}