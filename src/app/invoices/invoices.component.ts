import { Http } from '@angular/http/';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent {

  invoices: any[];

  constructor(http: Http){
    http.get("http://localhost:8000/api/invoices")
      .subscribe(response => {
        console.log(response.json());
        this.invoices = response.json();
      });
  }

  onClick(){
    console.log("Create New Invoice Clicked!!!")
  }

}
