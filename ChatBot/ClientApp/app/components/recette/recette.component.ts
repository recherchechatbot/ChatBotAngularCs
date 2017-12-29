import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'recette',
    templateUrl: './recette.component.html'
})
export class RecetteComponent {
    recettes = [];
    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/Recette').subscribe(result => {
            var myJSON = JSON.parse(result.json());
            console.log(myJSON);
            var myList = myJSON.Recettes;
            console.log(myList);
            var temp = [];
            let len = myList.length;
            for (var i = 0; i < len; i++) {
                this.recettes.push(myList[i].Titre as never);
                console.log(this.recettes);
            }
            console.log(this.recettes);
        }, error => console.error(error));
    }
}
