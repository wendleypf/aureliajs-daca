import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';
@inject(HttpClient)
export class App {

    constructor(http) {
        http.configure(config => {
            config
                .withBaseUrl('http://localhost:8080/api/')
                .withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                });
        });

        this.http = http;
    }

    configureRouter(config, router){
        config.title = 'Dirlididi';

        config.map([
            { route: ['','home'],  name: 'home',
                moduleId: './home',  nav: true, title:'Welcome' },
            { route: 'problemas',  name: 'problemas',
                moduleId: './problemas',    nav: true, title:'Problems' },
            {
                  route: 'problema/:id',
                  name: 'detalhes-problema',
                  moduleId: './detalhes-problema',
                  nav: false,
                  title: 'Problema'
            }
        ]);

        this.router = router;
    }
}
