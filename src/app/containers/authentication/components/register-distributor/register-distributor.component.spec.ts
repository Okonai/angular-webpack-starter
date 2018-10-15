import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDistributorComponent } from './register-distributor.component';

describe('RegisterDistributorComponent', () => {
  let component: RegisterDistributorComponent;
  let fixture: ComponentFixture<RegisterDistributorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterDistributorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
