import { Component, OnInit } from '@angular/core';
import { Unit, Property, PropertyService } from '../api/client/properties/property.service';
import { Router } from '@angular/router';


@Component({
  selector: 'create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {

  units: Unit[] = [];
  unit: Unit = {
    number: "",
    floor: 0,
    rent: 0,
    vacant: true
  };

  unitError: string = "";
  propertyError: string = "";

  address: {
    line1: string,
    line2?: string,
    city: string,
    province: string,
    postalcode: string
  } = {
    line1: "",
    city: "",
    province: "",
    postalcode: ""
  };

  name: string = "";
  propId: any;

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  createUnit() {
    if(this.validateUnit()) {
      this.units.push(this.unit);
      this.unit = {
        number: "",
        floor: 0,
        rent: 0,
        vacant: true
      }
      this.unitError = "";
    }
  }

  validateUnit() {
    if(this.unit.number == "") {
      this.unitError = "Unit number cannot be empty";
      return false;
    }

    if(this.unit.floor < 0) {
      this.unitError = "Floor must be greater or equal to 0";
      return false;
    }

    if(this.unit.rent <= 0) {
      this.unitError = "Rent must be greater than 0";
      return false;
    }

    return true;
  }

  removeUnit(unit) {
    this.units = this.units.filter(unitObj => {
      return unitObj !== unit;
    });
  }

  createProperty() {
    if(this.validatePropertyFields()) {
      let fullAddress = this.address.line1 + ", ";
      if(this.address.line2) {
        fullAddress = fullAddress + this.address.line2 + ", ";
      }
      fullAddress = fullAddress + this.address.city + ", " + this.address.province + ", "
        + this.address.postalcode;

      let prop: Property = {
        name: this.name,
        address: fullAddress,
        units: this.units
      }

      this.propertyService.createProperty(prop)
      .subscribe(propObj => {
        this.router.navigate(['properties/', propObj.id]);
      });
    }
  }

  validatePropertyFields() {
    if(!this.name) {
      this.propertyError = "Please enter a property name";
      return false;
    }

    if(!this.address.line1 || !this.address.city || !this.address.postalcode || !this.address.province) {
      this.propertyError = "Please complete your address";
      return false;
    }

    if(this.units.length == 0) {
      this.propertyError = "Please add at least one unit to this property";
      return false;
    }

    return true;
  }

}
