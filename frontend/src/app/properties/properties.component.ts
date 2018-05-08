import { Component, OnInit } from '@angular/core';
import { Property, PropertyService } from '../api/client/properties/property.service';
import { UserService } from '../api/client/users/user.service';


@Component({
  selector: 'properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit {

  properties: Property[] = [];

  constructor(
    private propertyService: PropertyService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadProperties();
  }

  loadProperties() {
    this.propertyService.queryProperties()
      .subscribe(properties => {
        this.properties = properties;
      });
  }

}
