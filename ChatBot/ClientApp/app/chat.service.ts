import { Injectable } from '@angular/core';
import { ApiAiClient } from 'api-ai-javascript';//à ajouter
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RecetteComponent } from './components/recette/recette.component';
import { Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class Message {
    constructor(public content: any, public sentBy: string) { }
}

@Injectable()
export class ChatService {

    recettes = [];
    readonly token = '823a375c3cc540cc9f675246d6aee90c';/* environment.dialogflow.ChatbotNtfNg;*/
    readonly client = new ApiAiClient({ accessToken: this.token });
    //BehaviourSubject= represente une valeur qui change avec le temps. Ici mon array de messages.
    conversation = new BehaviorSubject<Message[]>([]);
    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) {

    }

    //Ajoute message à la source=>next pour le behavioursubject=> En gros on rajoute un message dans l'array et donc à terme dans le feed 
    update(msg: Message) {
        this.conversation.next([msg]);
    }

    //Envoie et recoit des messages depuis Dialogflow
    converse(msg: string) {
        return this.client.textRequest(msg)
            .then(res => {
                const userMessage = new Message(msg, 'user');
                this.update(userMessage);
                let action = res.result.action;
                let product = res.result.parameters.Nourriture;
                console.log(action);
                console.log("Voici le JSON qu'on recoit: " + JSON.stringify(res));
                console.log("Et le res.result: " + JSON.stringify(res.result));
                if (action == "recherche.recette") {
                    this.http.post(this.baseUrl + 'api/Message', { Message:  product}).subscribe(result => {//TODO:Gerer le cas d'une erreur (pas de résultat pour l'ingrédient du client')'
                        this.formatRecette(result);
                    });
                }
                else {
                    const speech = res.result.fulfillment.speech;
                    const botMessage = new Message(speech, 'bot');
                    this.update(botMessage);
                    console.log("Regarde iciiiiiii: " + JSON.stringify(botMessage));
                }
            })
    }
    //Gère le format à donner au module carouselamos pour faire un carousel.
    formatRecette(result: any) {
        console.log(result.json());
        var myJSON = JSON.parse(result.json());
        console.log(myJSON);
        var myList = myJSON.Recettes;
        console.log(myList);
        var temp = [];
        var myString = "Voici les résultats de votre recherche: ";
        let len = myList.length;
        for (var i = 0; i < len; i++) {
            let obj = { title: myList[i].Titre, url: myList[i].ImageUrl, linkRecette: "https://drive.intermarche.com/1-nantes-leraudiere/recette/" + myList[i].IdRecette + "-yolo" };
            this.recettes.push(obj);
            console.log(this.recettes);
            myString += '\n\n ' + myList[i].Titre;
        }
        console.log(this.recettes[0]);
        console.log(this.recettes[0].title);
        console.log(this.recettes[0].url);
        const botMessage = new Message(this.recettes, 'bot');
        this.update(botMessage);
        console.log(botMessage);
        this.recettes = [];
    }
}
