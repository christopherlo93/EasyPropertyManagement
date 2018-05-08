import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/client/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /**
   * User credentials model
   */
  user: {
    email: string,
    password: string
  } = {
    email: "",
    password: ""
  };

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  /**
   * Authenticates user with the backend, then navigate user to property listings page
   */
  login() {
    this.userService.authUser(this.user)
    .subscribe(token => {
      this.userService.saveToken(token.token);
      this.router.navigateByUrl('properties');
    });
  }

  /**
   * Validates login credentials: Email in the correct format
   */
  validateFields() {
    // TODO
  }

}
