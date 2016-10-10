import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Home {
    constructor(http) {
        this.http = http;
        this.submitters = 1;
        this.problems = 1;
        this.getStatsGlobalJson();
    }
    
    getStatsGlobalJson() {
        this.http.fetch('stats/global')
            .then(response => response.json())
            .then(data => {
                this.submitters = data.submitters;
                this.problems = data.problems;
            });
    }
}
