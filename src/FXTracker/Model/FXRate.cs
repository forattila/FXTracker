using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FXTracker.Model
{
    /// <summary>
    /// Exchange rate of a currency pair
    /// </summary>
    public class FXRate
    {
        // Unique identifier in XXX/YYY format
        public string Id { get; set; }

        // Date of the exchange rate value
        public DateTime Date { get; set; }

        // Exchange rate value
        public double Rate { get; set; }

        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="id"></param>
        /// <param name="date"></param>
        /// <param name="rate"></param>
        public FXRate(string id, DateTime date, double rate)
        {
            Id = id;
            Date = date;
            Rate = rate;
        }

    }
}
