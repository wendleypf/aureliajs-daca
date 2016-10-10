import {inject} from "aurelia-framework";
import {HttpClient, json} from 'aurelia-fetch-client';

@inject(HttpClient)
export class Problemas {
    constructor(http) {
        this.http = http;
        
        //record setting properties
        this.pageSize   = 10;
        this.startIndex = 0;
        this.endIndex   = this.pageSize;
        
        //these properties control the previous and next buttons enabling behaviour
        this.disableStart=true;
        this.disableEnd=false;
    
        //this property will store the total employee records count
        this.problemasCount = 0;
    
        //this property will store the employee records
        this.allProblems = [];

        //invoke this function when page loads. So it is kept inside the constructor
        this.currentProblems();
    
    }
    
    //this method will be invoked on page load
    currentProblems() {
        this.getProblems(this.startIndex,this.endIndex);
    }

    //this method will be called when Previous button is clicked
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

    //this method will be called when Next button is clicked
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
    
    //this method fetches the employee records for a particular range specified.It uses http-fetch client
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