public with sharing class SFDC_FetchRelatedContact {
	@AuraEnabled(cacheable=true)
    public static List<Contact> getMyContacts (String accId, String searchKey){
		String searchTerm = '%'+ searchKey + '%';
        List<Contact> listOfCon = [SELECT Id, AccountId, FirstName, LastName, Email
									FROM Contact Where AccountId =: accId AND Name LIKE : searchTerm];
        if(!listOfCon.isEmpty()){
            return listOfCon;
        }
		return null;
    } 

	@AuraEnabled
	public static Integer contactCount (String accId){
		Integer count = 0;
        if(accId != null){
            List<Contact> listOfCon = [SELECT Id FROM Contact Where AccountId =: accId];
            count = listOfCon.size();
			System.debug(count);
        }
        return count;
    } 
}