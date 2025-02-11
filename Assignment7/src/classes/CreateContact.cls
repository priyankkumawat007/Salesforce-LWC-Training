public without sharing class CreateContact {
    	@AuraEnabled
    	public static List<Contact> createContacts(String firstName, String lastName, String Phone, String Email, String recordId){
        	List<Contact> conList = new List<Contact>();
		Contact con = new Contact();
        	if(lastName != null){
            		con.AccountId = recordId;
            		con.FirstName = firstName;
            		con.LastName = lastName;
            		con.Phone = Phone;
            		con.Email = Email;
            		conlist.add(con);
		}
		if(!conList.isEmpty()){
            		try{
            			insert conList;
				return conList;
            		}catch(Exception ex){
               			System.debug(ex);
            		}
        	}
		return NULL;
    	}

	@AuraEnabled
 	public static List<Contact> createContactsUsingAccId(String recordId, String firstName, String lastName, String Phone, String Email){
        	List<Contact> conList = new List<Contact>();
        	Contact con = new Contact();
        	if(lastName != null){
            		con.AccountId = recordId;
            		con.FirstName = firstName;
            		con.LastName = lastName;
            		con.Phone = Phone;
            		con.Email = Email;
            		conlist.add(con);
        	}
        	if(!conList.isEmpty()){
            		try{
                		insert conList;
                		return conList;
            		}catch(Exception ex){
                		System.debug(ex);
            		}
        	}
        	return NULL;
   	 }
}