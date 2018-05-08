import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { PropertyService } from './properties/property.service';
import { UserService } from './users/user.service';

@NgModule({
  imports: [CommonModule, HttpClientModule]
})
export class ApiClientModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ApiClientModule,
      providers: [
        PropertyService,
        UserService
      ]
    };
  }
}
