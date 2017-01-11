using FXTracker.Interfaces.Repository;
using FXTracker.Model;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace FXTracker.Repositories
{
    public class FXRateRepository : IFXRateRepository
    {
        public List<Currency> Currencies { get; set; } = new List<Currency>();
        public List<FXRate> FXRates { get; set; } = new List<FXRate>();
        public List<DateTime> Dates { get; set; } = new List<DateTime>();

        public FXRateRepository()
        {
            Init();
        }

        private void Init()
        {
            XDocument doc = GetFXRatesXml();
            var items = doc.Descendants().Where(d => d.Name.LocalName == "Cube" && d.Attribute("time") != null);
            if (items != null)
            {
                items.ToList().ForEach(item =>
                {
                    var subItems = item.Elements();
                    if (subItems != null)
                    {
                        subItems.ToList().ForEach(subItem =>
                        {
                            ProcessFXRateItem(item, subItem);
                        });
                    }

                });

            }
        }

        private void ProcessFXRateItem(XElement item, XElement subItem)
        {
            DateTime date;
            DateTime.TryParse(item.Attribute("time").Value, out date);
            double rate;
            Double.TryParse(subItem.Attribute("rate").Value, System.Globalization.NumberStyles.Any, CultureInfo.InvariantCulture, out rate);
            string currencyString = subItem.Attribute("currency").Value;

            if (date != default(DateTime) && rate != default(double) && !String.IsNullOrEmpty(currencyString))
            {
                if (Dates.All(d => d != date))
                {
                    Dates.Add(date);
                }

                currencyString = "EUR/" + currencyString;
                var currency = new Currency(currencyString, currencyString);
                if (Currencies.All(c=>c.Id!= currency.Id))
                {
                    Currencies.Add(currency);
                }

                FXRates.Add(new FXRate(currencyString, date, rate));
            }
        }

        private static XDocument GetFXRatesXml()
        {
            HttpClient httpClient = new HttpClient();
            var httpResult = httpClient.GetAsync("http://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml").Result;
            var responseString = httpResult.Content.ReadAsStringAsync().Result;
            XDocument doc = XDocument.Parse(responseString);
            return doc;
        }
    }
}
