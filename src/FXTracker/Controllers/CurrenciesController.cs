using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FXTracker.Model;
using Microsoft.AspNetCore.Mvc;

namespace FXTracker.Controllers
{
    [Route("api/[controller]")]
    public class CurrenciesController : Controller
    {
        
        [Route(nameof(Currencies))]
        [HttpGet]
        public IEnumerable<Currency> Currencies()
        {
            IEnumerable<Currency> result = new List<Currency>{
                new Currency("EUR/HUF","EUR/HUF"),
                new Currency("GBP/HUF","GBP/HUF"),
                new Currency("USD/HUF","USD/HUF")
            };
            
            return result;
        }

 
    }
}
