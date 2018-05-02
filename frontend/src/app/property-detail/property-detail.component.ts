import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Unit, Property, PropertyService } from '../api/client/properties/property.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  id: string;
  property: Property;
  units: Unit[];

  constructor(
    private route: ActivatedRoute,
    private propertyService: PropertyService
  ) { 
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.loadUnits();
  }

  loadUnits() {
    this.propertyService.getProperty(this.id)
    .subscribe(property => {
      this.property = property;
      this.units = property.units;
    });
  }

}
