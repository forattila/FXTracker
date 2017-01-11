using FXTracker.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FXTracker.Interfaces.Repository
{
    public interface IFXRateRepository
    {
        List<Currency> Currencies { get; set; }
        List<FXRate> FXRates { get; set; }
        List<DateTime> Dates { get; set; }
    }
}
