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

  /**
   * Sets the Authorization header of our HTTP requests to the user's JWT token.
   */
  private authHeader = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.userService.getToken()}`
    })
  };


  /**
   * Queries the backend database for property listings
   * @param query query options for searching properties
   * @param params limit: amount of properties to query, offset: list properties starting at this position
   */
  public queryProperties(
    query: any = {},
    params: { limit: number; offset: number } = { limit: 10, offset: 0 },
  ): Observable<Property[]> {
    const headers = { Authorization: `Bearer ${this.userService.getToken()}` }
    return this.http.post<Property[]>(PROPERTIES_PATH, query, {
      params: {
        limit: `${params.limit}`,
        offset: `${params.offset}`
      },
      headers
    });
  }

  /**
   * Gets a property object from the backend database given the unique ID
   * @param {string} id unique id of a property
   */
  public getProperty(
    id: string = "",
  ): Observable<Property> {
    return this.http.post<Property>(PROPERTIES_PATH + "/getProperty", {propertyId: id}, this.authHeader);
  }

  /**
   * Stores a property object in the backend database
   * @param {Property} property property that will be stored in the database
   */
  public createProperty(
    property: Property,
  ): Observable<any> {
    return this.http.post<any>(PROPERTIES_PATH + "/createProperty", {newProperty: property}, this.authHeader);
  }
}
