using FXTracker.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FXTracker.Interfaces.Repository
{
    /// <summary>
    /// Currency exchange rate repository
    /// </summary>
    public interface IFXRateRepository
    {
        // Stored currencies
        List<Currency> Currencies { get; set; }

        // Stored exchange rates
        List<FXRate> FXRates { get; set; }

        // Stored dates
        List<DateTime> Dates { get; set; }
    }
}
