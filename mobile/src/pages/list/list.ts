import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PropertyProvider, Property } from '../../providers/property/property';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  properties: Property[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private propertyProvider: PropertyProvider
  ) {
    
  }

  ionViewDidLoad() {
    this.loadProperties();
  }

  loadProperties() {
    this.propertyProvider.queryProperties()
      .subscribe(properties => {
        this.properties = properties;
      });
  }

  
  
}
