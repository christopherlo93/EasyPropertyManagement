import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { APIConfig } from '../api.config';

const USERS_PATH = `${APIConfig.BASE_API_PATH}/api/users`;

export interface NewUser {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

@Injectable()
export class UserService {

  private token: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public saveToken(token: string): void {
    localStorage.setItem('jwt', token);
    this.token = token;
  }

  private getToken(): string {
    if(!this.token) {
      this.token = localStorage.getItem('jwt');
    }
    return this.token;
  }

  public createUser(
    user: NewUser
  ): Observable<any> {
    return this.http.post<any>(USERS_PATH + "/createUser", {newUser: user});
  }

  public authUser(
    user: {
      email: string,
      password: string
    }
  ): any {
    return this.http.post<any>(USERS_PATH + "/authUser", {user: user});
  }

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

  public isAuth(): boolean {
    const user = this.getUserDetails();
    if(user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('jwt');
    this.router.navigateByUrl('/');
  }

}
