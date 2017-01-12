namespace FXTracker.Model
{
    /// <summary>
    /// Currency pairs
    /// </summary>
    public class Currency
    {
        // Unique identifier in XXX/YYY format
        public string Id { get; set; }

        // Display name of the currency pair
        public string DisplayName { get; set; }


        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="id"></param>
        /// <param name="displayName"></param>
        public Currency(string id, string displayName)
        {
            this.Id = id;
            this.DisplayName = displayName;
        }
    }
}