namespace MovieApi.Helpers
{
    public static class Status
    {
        public const int Success = 200;
        public const int Error = 500;

        // 101: "Username or password incorect"
        // 102: User already exists!
        // 103: "Email already exists!"
        // 104: User not found
        //105: Email cannot be confirmed
    }
}
