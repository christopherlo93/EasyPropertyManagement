import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/client/users/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  login() {
    this.userService.authUser(this.user)
    .subscribe(token => {
      this.userService.saveToken(token.token);
      this.router.navigateByUrl('properties');
    });
  }

}
