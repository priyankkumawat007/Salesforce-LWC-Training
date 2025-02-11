public with sharing class SFDC_FetchAccounts {
	@AuraEnabled(cacheable=true)
    public static List<Account> getMyAccounts (String recordId){
        List<Account> listOfAcc = [SELECT Id, Name, Industry, Website, Phone
									FROM Account Where Id=: recordId];
        if(!listOfAcc.isEmpty()){
            return listOfAcc;
        }
		return null;
    } 

	@AuraEnabled(cacheable=true)
    public static List<Account> getMyAllAccounts (){
        List<Account> listOfAcc = [SELECT Id, Name, Industry, Website, Phone
									FROM Account LIMIT 10];
        if(!listOfAcc.isEmpty()){
            return listOfAcc;
        }
		return null;
    } 
	@AuraEnabled(cacheable=true)
	public static List<Account> getMyAccountsData (String recordId){
		List<Account> listOfAcc = [SELECT Id, Name, OwnerId, Description,Contact_Count__c FROM Account WHERE Id =:recordId];
        if(!listOfAcc.isEmpty()){
            return listOfAcc;
        }
		return null;
    } 
}