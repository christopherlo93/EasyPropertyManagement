import { Component, OnInit } from '@angular/core';
import { Unit, Property, PropertyService } from '../api/client/properties/property.service';
import { Router } from '@angular/router';


@Component({
  selector: 'create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.css']
})
export class CreateListingComponent implements OnInit {

  /**
   * Units in the property
   */
  units: Unit[] = [];

  /**
   * Unit model
   */
  unit: Unit = {
    number: "",
    floor: null,
    rent: null,
    vacant: true
  };

  /**
   * Validation error messages
   */
  errorMessages: any = {
    unit: "",
    property: ""
  }

  /**
   * Address model
   */
  address: {
    name: string,
    line1: string,
    line2?: string,
    city: string,
    province: string,
    postalcode: string
  } = {
    name: "",
    line1: "",
    city: "",
    province: "",
    postalcode: ""
  };

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  /**
   * Validates the unit information user submitted and pushes it on to an array of Units
   */
  createUnit() {
    if(this.validateUnit()) {
      this.units.push(this.unit);
      this.unit = {
        number: "",
        floor: null,
        rent: null,
        vacant: true
      }
      this.errorMessages.unit = "";
    }
  }

  /**
   * Validates user fields for adding a unit
   */
  validateUnit() {
    if(this.unit.number == "") {
      this.errorMessages.unit = "Unit number cannot be empty";
      return false;
    }

    if(this.unit.floor < 0) {
      this.errorMessages.unit = "Floor must be greater or equal to 0";
      return false;
    }

    if(this.unit.rent <= 0) {
      this.errorMessages.unit = "Rent must be greater than 0";
      return false;
    }

    return true;
  }

  /**
   * Deletes an unit from the array
   * @param unit Unit added to the array that will be deleted
   */
  removeUnit(unit) {
    this.units = this.units.filter(unitObj => {
      return unitObj !== unit;
    });
  }

  /**
   * Adds a property in the backend database
   */
  createProperty() {
    if(this.validatePropertyFields()) {
      let fullAddress = this.address.line1 + ", ";
      if(this.address.line2) {
        fullAddress = fullAddress + this.address.line2 + ", ";
      }
      fullAddress = fullAddress + this.address.city + ", " + this.address.province + ", "
        + this.address.postalcode;

      let prop: Property = {
        name: this.address.name,
        address: fullAddress,
        units: this.units
      }

      this.propertyService.createProperty(prop)
      .subscribe(propObj => {
        this.router.navigate(['properties/', propObj.id]);
      });
    }
  }

  /**
   * Validates user fields for the property and checks if the units array is empty
   */
  validatePropertyFields() {
    if(!this.address.name) {
      this.errorMessages.property = "Please enter a property name";
      return false;
    }

    if(!this.address.line1 || !this.address.city || !this.address.postalcode || !this.address.province) {
      this.errorMessages.property = "Please complete your address";
      return false;
    }

    if(this.units.length == 0) {
      this.errorMessages.property = "Please add at least one unit to this property";
      return false;
    }

    return true;
  }

}
