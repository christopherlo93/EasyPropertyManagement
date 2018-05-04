import { Component, OnInit } from '@angular/core';
import { UserService } from './api/client/users/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Easy Property Management';
  
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {

  }


}
