import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers: any;

  constructor(http: Http){
    http.get("http://localhost:8000/api/customers")
      .subscribe(response => {
        this.customers = response.json();
      });
  }

}
