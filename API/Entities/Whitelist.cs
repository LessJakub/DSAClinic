namespace API.Entities
{
    public class Whitelist
    {
        public int Id { get; set; }

        public string Ip { get; set; }

        public bool IsEnabled { get; set; }
    }
}