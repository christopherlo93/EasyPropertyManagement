import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from './api/client/users/user.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate() {
    if(!this.userService.isAuth()) {
      this.router.navigateByUrl('/');
      return false;
    }
    return true;
  }
}
