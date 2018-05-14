import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthProvider } from '../auth/auth';
import { Observable } from 'rxjs/Observable';


const PROPERTIES_PATH = `http://localhost:3000/api/properties`;

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
export class PropertyProvider {

  constructor(
    public http: HttpClient,
    private authProvider: AuthProvider
  ) {
    console.log('Hello PropertyProvider Provider');
  }

  /**
   * Sets the Authorization header of our HTTP requests to the user's JWT token.
   */
  private authHeader = {
    headers: new HttpHeaders({
      Authorization: `Bearer ${this.authProvider.getToken()}`
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
    const headers = { Authorization: `Bearer ${this.authProvider.getToken()}` }
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
