import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListingComponent } from './create-listing.component';
import { FormsModule } from '@angular/forms';
import { VacantPipe } from '../vacant.pipe';
import { PropertyService } from '../api/client/properties/property.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../api/client/users/user.service';
import { Router } from '@angular/router';


describe('CreateListingComponent', () => {
  let component: CreateListingComponent;
  let fixture: ComponentFixture<CreateListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule, 
        HttpClientTestingModule 
      ],
      declarations: [ 
        CreateListingComponent, 
        VacantPipe 
      ],
      providers: [ 
        PropertyService, 
        UserService,
        { provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
