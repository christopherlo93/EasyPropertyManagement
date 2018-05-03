import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PropertyDetailComponent } from './property-detail/property-detail.component';
import { PropertiesComponent } from './properties/properties.component';
import { CreateListingComponent } from './create-listing/create-listing.component';

const routes: Routes = [
  { path: '', redirectTo: 'properties', pathMatch: 'full' },
  { path: 'properties', component: PropertiesComponent},
  { path: 'properties/:id', component: PropertyDetailComponent },
  { path: 'properties', redirectTo: '/', pathMatch: 'full'},
  { path: 'create-listing', component: CreateListingComponent }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
