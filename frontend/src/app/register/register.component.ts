import { Component, OnInit } from '@angular/core';
import { NewUser, UserService } from '../api/client/users/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  /**
   * New user model
   */
  user: NewUser = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  /**
   * Creates a new user on the backend database
   */
  register() {
    this.userService.createUser(this.user)
    .subscribe(userObj => {
      console.log("successfully created new user: userObj.id");
    });
  }

  /**
   * Validates the user fields for creating a new user
   */
  validateFields() {
    // TODO
  }

}
