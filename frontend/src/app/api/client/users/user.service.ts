import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { APIConfig } from '../api.config';

const USERS_PATH = `${APIConfig.BASE_API_PATH}/api/users`;

/**
 * Structure of a new user
 */
export interface NewUser {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

/**
 * Structure of the user details from the JWT
 */
export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenPayload {
  token: string;
}

@Injectable()
export class UserService {

  /**
   * Current authenticated user's JWT token used for API calls
   */
  private token: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /**
   * Saves user's JWT token to local storage
   * @param token User's JWT generated from backend
   */
  public saveToken(token: string): void {
    localStorage.setItem('jwt', token);
    this.token = token;
  }

  /**
   * Returns the current authenticated user's JWT token, or gets it from local storage
   */
  public getToken(): string {
    if(!this.token) {
      this.token = localStorage.getItem('jwt');
    }
    return this.token;
  }

  /**
   * Creates a new user in the backend, returns userID
   * @param user credentials to create a new user in the backend
   */
  public createUser(
    user: NewUser
  ): Observable<any> {
    return this.http.post<any>(USERS_PATH + "/createUser", {newUser: user});
  }

  /**
   * Authenticates a new user and returns a JWT token
   * @param user user credentials to be authenticated
   */
  public authUser(
    user: {
      email: string,
      password: string
    }
  ): Observable<TokenPayload> {
    return this.http.post<TokenPayload>(USERS_PATH + "/authUser", {user: user});
  }

  /**
   * Splits the JWT token and decodes the user details
   */
  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if(token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  /**
   * Checks if current user is authenticated by checking if JWT token exists/not expired
   */
  public isAuth(): boolean {
    const user = this.getUserDetails();
    if(user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  /**
   * Gets the first name of the authenticated user
   */
  public getUserName(): string {
    const user = this.getUserDetails();
    if(user) {
      return user.name;
    } else {
      return null;
    }
  }

  /**
   * Logs user out by removing user's JWT from local storage and navigates user back to home page
   */
  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('jwt');
    this.router.navigateByUrl('/');
  }

}
