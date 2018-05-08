import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../api/client/users/user.service';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ 
          FormsModule, 
          HttpClientTestingModule
        ],
        declarations: [ 
          RegisterComponent
        ],
        providers: [ 
          UserService,
          { provide: Router,
            useClass: class { navigate = jasmine.createSpy("navigate"); }
          }
        ]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
