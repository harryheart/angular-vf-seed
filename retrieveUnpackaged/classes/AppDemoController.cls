public class AppDemoController 
{
    @RemoteAction
    public static List<Account> getAccounts()
    {
        List<Account> accounts = [select Id, Name from Account];
        return accounts;
    }
    
    @RemoteAction
    public static Account getAccount(String accId)
    {
        Account acc = [select Id, Name from Account where Id = :accId];
        return acc;
    }
}