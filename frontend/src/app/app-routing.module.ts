import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertiesComponent } from './properties/properties.component';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'properties', component: PropertiesComponent, canActivate: [AuthGuardService] },
  { path: 'properties/:id', component: PropertyDetailComponent, canActivate: [AuthGuardService]},
  { path: 'create-listing', component: CreateListingComponent, canActivate: [AuthGuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [ AuthGuardService ]
})
export class AppRoutingModule { }
