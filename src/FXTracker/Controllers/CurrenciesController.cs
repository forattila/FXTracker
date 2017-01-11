using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FXTracker.Model;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Diagnostics;
using System.Xml.Linq;
using System.Globalization;
using FXTracker.Interfaces.Repository;

namespace FXTracker.Controllers
{
    [Route("api/[controller]")]
    public class CurrenciesController : Controller
    {

        private IFXRateRepository fxRateRepository;

        public CurrenciesController(IFXRateRepository fxRateRepository)
        {
            this.fxRateRepository = fxRateRepository;
        }

        [Route(nameof(Currencies))]
        [HttpGet]
        public IEnumerable<Currency> Currencies()
        {
            return fxRateRepository.Currencies;
        }

        [Route(nameof(FXRates))]
        [HttpGet]
        public IEnumerable<FXRate> FXRates()
        {
            return fxRateRepository.FXRates;
        }
 
    }
}
