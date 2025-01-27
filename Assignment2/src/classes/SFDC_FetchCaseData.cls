public with sharing class SFDC_FetchCaseData {
    @AuraEnabled(cacheable=true)
    public static List<Case> getMyCases(String statusVal, String recordId){
        List<Case> caseList =[SELECT id, Status, CaseNumber, ContactPhone,ContactEmail,Owner.Name,Subject,AccountId FROM Case 
			      WHERE Status=:statusVal AND AccountId=: recordId AND ownerId=: userInfo.getUserId()];
	return caseList;
    }
}