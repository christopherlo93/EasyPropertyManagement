import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyDetailComponent } from './property-detail.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { VacantPipe } from '../vacant.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService } from '../api/client/properties/property.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from '../api/client/users/user.service';
import { RouterTestingModule } from '@angular/router/testing';



describe('PropertyDetailComponent', () => {
  let component: PropertyDetailComponent;
  let fixture: ComponentFixture<PropertyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxPaginationModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [ 
        PropertyDetailComponent,
        VacantPipe
      ],
      providers: [
        PropertyService,
        UserService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
