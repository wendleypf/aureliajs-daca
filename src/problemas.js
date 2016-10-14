import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Problemas {
    constructor(http) {
        this.http = http;

        this.pageSize   = 10;
        this.startIndex = 0;
        this.endIndex   = this.pageSize;

        this.disableStart=true;
        this.disableEnd=false;

        this.problemasCount = 0;

        this.allProblems = [];

        this.currentProblems();
    }

    currentProblems() {
        this.getProblems(this.startIndex,this.endIndex);
    }

    prevProblems() {
        this.startIndex=this.startIndex - this.pageSize ;
        this.endIndex=this.endIndex - this.pageSize ;

        if(this.startIndex==0){
            this.disableStart=true;
            this.getProblems(this.startIndex,this.endIndex);

        } else {
            this.disableEnd =false;
            this.getProblems(this.startIndex,this.endIndex);
        }

    }

    nextProblems() {
        this.startIndex=this.startIndex + this.pageSize ;
        this.endIndex=this.endIndex + this.pageSize ;

        if(this.endIndex === this.problemasCount){

            this.disableEnd =true;
            this.getProblems(this.startIndex,this.endIndex);
        } else {
            this.disableStart=false;
            this.getProblems(this.startIndex,this.endIndex);
        }
    }

    getProblems(startIDX, endIDX) {
        this.http.fetch('problem/pagination/?startIndex='+ startIDX +'&endIndex='+ endIDX)
            .then(response => response.json())
            .then(data => {
                this.allProblems = data;
            });

        this.http.fetch('stats/global')
            .then(response => response.json())
            .then(data => {
                this.problemasCount = data.problems;
            });
    }
}
