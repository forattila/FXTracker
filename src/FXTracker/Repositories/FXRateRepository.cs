using FXTracker.Interfaces.Repository;
using FXTracker.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
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

        private IOptions<AppSettings> settings;

        public List<Currency> Currencies { get; set; } = new List<Currency>();
        public List<FXRate> FXRates { get; set; } = new List<FXRate>();
        public List<DateTime> Dates { get; set; } = new List<DateTime>();

        /// <summary>
        /// Default constructor
        /// </summary>
        /// <param name="settings">Injected settings value</param>
        public FXRateRepository(IOptions<AppSettings> settings)
        {
            this.settings = settings;

            Init();
        }

        /// <summary>
        /// Init method
        /// </summary>
        private void Init()
        {
            var url = settings.Value.RateSourceUrl;
            XDocument doc = GetFXRatesXml(url);
            ProcessRatesXml(doc);

        }

        /// <summary>
        /// Processes the exchange rates from an XML document 
        /// </summary>
        /// <param name="doc"></param>
        private void ProcessRatesXml(XDocument doc)
        {
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

        /// <summary>
        /// Processes an exchange rate item from an XML document
        /// </summary>
        /// <param name="item"></param>
        /// <param name="subItem"></param>
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

        /// <summary>
        /// Downloads the exchange rate source xml
        /// </summary>
        /// <param name="url">Source XML URL</param>
        /// <returns></returns>
        private static XDocument GetFXRatesXml(string url)
        {
            HttpClient httpClient = new HttpClient();
            var httpResult = httpClient.GetAsync(url).Result;
            var responseString = httpResult.Content.ReadAsStringAsync().Result;
            XDocument doc = XDocument.Parse(responseString);
            return doc;
        }
    }
}
