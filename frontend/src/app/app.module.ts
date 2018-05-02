import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { ApiClientModule } from './api/client/api-client.module';
import { AppComponent } from './app.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { PropertiesComponent } from './properties/properties.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertyDetailComponent,
    PropertiesComponent
  ],
  imports: [
    BrowserModule,
    ApiClientModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
