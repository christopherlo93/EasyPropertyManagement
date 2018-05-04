import { Component, OnInit } from '@angular/core';
import { NewUser, UserService } from '../api/client/users/user.service';



@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

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

  register() {
    this.userService.createUser(this.user)
    .subscribe(userObj => {
      console.log(userObj.id);
    });
  }

}
