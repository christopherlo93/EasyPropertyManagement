import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unit, Property, PropertyService } from '../api/client/properties/property.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  /**
   * ID of the current property
   */
  id: string;

  /**
   * Property object
   */
  property: Property;

  /**
   * Array of units in the property
   */
  units: Unit[];

  /**
   * Counter for page number
   */
  p: number = 1;

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) { 
  }

  /**
   * On init, get the ID from the navigation parameters and load the units
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.loadUnits();
  }

  /**
   * Get the property from the database and load the units.
   */
  loadUnits() {
    this.propertyService.getProperty(this.id)
    .subscribe(property => {
      this.property = property;
      this.units = property.units;
    });
  }

}
