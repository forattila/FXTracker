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

        // The repository containing the exchange rate informations
        private IFXRateRepository fxRateRepository;

        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="fxRateRepository">injected repository</param>
        public CurrenciesController(IFXRateRepository fxRateRepository)
        {
            this.fxRateRepository = fxRateRepository;
        }

        /// <summary>
        /// List of currency pairs
        /// </summary>
        /// <returns></returns>
        [Route(nameof(Currencies))]
        [HttpGet]
        public IEnumerable<Currency> Currencies()
        {
            return fxRateRepository.Currencies;
        }

        /// <summary>
        /// List of exchange rates
        /// </summary>
        /// <returns></returns>
        [Route(nameof(FXRates))]
        [HttpGet]
        public IEnumerable<FXRate> FXRates()
        {
            return fxRateRepository.FXRates;
        }
 
    }
}
