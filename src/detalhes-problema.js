import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Detalhes {
    problema = {};
    constructor(http) {
      this.http = http;
    }

    activate(params) {
        this.http.fetch('problem/' + params.id)
            .then(response => response.json())
            .then(data => {
                this.problema = data;
            });
    }
}
