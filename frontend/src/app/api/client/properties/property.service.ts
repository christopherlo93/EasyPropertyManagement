import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { APIConfig } from '../api.config';
import { UserService } from '../users/user.service';

const PROPERTIES_PATH = `${APIConfig.BASE_API_PATH}/api/properties`;

export interface Unit {
  number: string;
  floor: number;
  rent: number;
  vacant?: boolean;
}

export interface Property {
  _id?: string; // Assigned automatically by datastore
  name: string;
  address: string;
  units: Unit[];
}

@Injectable()
export class PropertyService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  private authHeader = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.userService.getToken()}`
    })
  };


  public queryProperties(
    query: any = {},
    params: { limit: number; offset: number } = { limit: 10, offset: 0 },
    headers: any = { Authorization: `Bearer ${this.userService.getToken()}` }
  ): Observable<Property[]> {
    return this.http.post<Property[]>(PROPERTIES_PATH, query, {
      params: {
        limit: `${params.limit}`,
        offset: `${params.offset}`
      },
      headers
    });
  }

  public getProperty(
    id: string = "",
  ): Observable<Property> {
    return this.http.post<Property>(PROPERTIES_PATH + "/getProperty", {propertyId: id}, this.authHeader);
  }

  public createProperty(
    property: Property,
  ): Observable<any> {
    return this.http.post<any>(PROPERTIES_PATH + "/createProperty", {newProperty: property}, this.authHeader);
  }
}
