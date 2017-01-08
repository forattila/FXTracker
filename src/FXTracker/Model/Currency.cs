namespace FXTracker.Model
{
    public class Currency
    {
        public string Id { get; set; }
        public string DisplayName { get; set; }

        public Currency(string id, string displayName)
        {
            this.Id = id;
            this.DisplayName = displayName;
        }
    }
}