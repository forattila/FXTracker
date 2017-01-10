using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FXTracker.Model
{
    public class FXRate
    {
        public string Id { get; set; }

        public DateTime Date { get; set; }

        public double Rate { get; set; }

        public FXRate(string id, DateTime date, double rate)
        {
            Id = id;
            Date = date;
            Rate = rate;
        }

    }
}
