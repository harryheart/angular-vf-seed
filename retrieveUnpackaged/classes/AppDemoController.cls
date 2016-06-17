public class AppDemoController 
{
    @RemoteAction
    public static List<Account> getAccounts()
    {
        List<Account> accounts = [select Id, Name from Account];
        return accounts;
    }
}