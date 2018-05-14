import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user: {
    email: string,
    password: string
  } = {
    email: "",
    password: ""
  }

  constructor(
    public navCtrl: NavController,
    private authProvider: AuthProvider) {
  }

  login() {
    this.authProvider.authUser(this.user)
    .subscribe(token => {
      this.authProvider.saveToken(token.token);
      this.navCtrl.push(ListPage);
    });
  }

}
