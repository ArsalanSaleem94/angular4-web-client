import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { CustomersComponent } from './customers/customers.component';
import { PostComponent } from './post/post.component';
import { PostService } from "./service/post.service";

@NgModule({
  declarations: [
    AppComponent,
    InvoicesComponent,
    CustomersComponent,
    PostComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [
    PostService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
