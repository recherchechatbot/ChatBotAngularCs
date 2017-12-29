using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace ChatBot.Services
{
    public class RecetteService
    {
        public async Task<string[]> ObtenirRecettes(string mot)
        {
            string url = "https://wsmcommerce.intermarche.com/";
            try
            {
                using (var Client = new HttpClient())
                {
                    Client.BaseAddress = new Uri(url);
                    Client.DefaultRequestHeaders.Accept.Clear();
                    Client.DefaultRequestHeaders.Add("TokenAuthentification", "805b11fc-3888-4db4-8915-f51090b7b747");
                    HttpResponseMessage response = await Client.GetAsync($"api/v1/recherche/recette?mot={mot}");
                    if (response.IsSuccessStatusCode)
                    {
                        var JSON = await response.Content.ReadAsStringAsync();
                        return new string[] { JSON };
                    }
                    else
                    {
                        return new string[] { "C'est raté" };
                    }
                }
            }
            catch (Exception)
            {
                return new string[] { "C'est une exception" };
            }
        }
    }
}
