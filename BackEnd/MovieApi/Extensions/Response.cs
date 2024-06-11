namespace MovieApi.Extensions
{
    public class Response<T>
    {
        public T Data { get; set; }
        public int? Status { get; set; }
        public string? Message { get; set; }
        public int? Code { get; set; }
    }
    public class Response
    {
        public int? Status { get; set; }
        public string? Message { get; set; }
        public int? Code { get; set; }
    }
}
