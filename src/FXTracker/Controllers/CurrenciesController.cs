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

        [Route(nameof(FXRates))]
        [HttpGet]
        public IEnumerable<FXRate> FXRates()
        {
            List<FXRate> result = new List<FXRate>();

            HttpClient httpClient = new HttpClient();
            var httpResult = httpClient.GetAsync("http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml").Result;
            var responseString = httpResult.Content.ReadAsStringAsync().Result;
            XDocument doc = XDocument.Parse(responseString);
            var items = doc.Descendants().Where(d => d.Name.LocalName == "Cube" && d.Attribute("time")!=null);
            if (items != null) {
                items.ToList().ForEach(item =>
                {
                var subItems = item.Elements();
                if (subItems != null)
                {
                    subItems.ToList().ForEach(subItem =>{

                        DateTime date;
                        DateTime.TryParse(item.Attribute("time").Value, out date);
                        double rate;
                        Double.TryParse(subItem.Attribute("rate").Value, System.Globalization.NumberStyles.Any, CultureInfo.InvariantCulture, out rate);
                        string currency = subItem.Attribute("currency").Value;

                        if (date != default(DateTime) && rate != default(double) && !String.IsNullOrEmpty(currency))
                        {
                            result.Add(new FXRate("EUR/" + currency, date, rate));
                        }
                    });
                    }
    
                });
            }
            
            return result;
        }
 
    }
}
