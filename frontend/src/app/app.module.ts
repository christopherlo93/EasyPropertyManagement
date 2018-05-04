import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { ApiClientModule } from './api/client/api-client.module';
import { AppComponent } from './app.component';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { AppRoutingModule } from './/app-routing.module';
import { PropertiesComponent } from './properties/properties.component';
import { VacantPipe } from './vacant.pipe';

// By Michael Bromley. Src: https://www.npmjs.com/package/ngx-pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertyDetailComponent,
    PropertiesComponent,
    VacantPipe,
    CreateListingComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ApiClientModule.forRoot(),
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
