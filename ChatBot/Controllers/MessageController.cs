using ChatBot.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Raven.AspNet.SessionState;
using ChatBot.Services;

namespace ChatBot.Controllers
{
    [Route("api/[controller]")]
    public class MessageController : Controller        
    {
        [HttpPost]
        public async Task<string[]> PostAsync([FromBody] MessageClient messageClient)
        {
            RecetteService recetteService = new RecetteService();
            //On attend les résultats de l'appel du mcomemrce
            var resultat = await recetteService.ObtenirRecettes(messageClient.Message);
            return resultat;
        }
    }
}
