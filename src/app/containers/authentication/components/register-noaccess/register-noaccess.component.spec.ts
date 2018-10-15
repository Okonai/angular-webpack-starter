import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNoaccessComponent } from './register-noaccess.component';

describe('RegisterNoaccessComponent', () => {
  let component: RegisterNoaccessComponent;
  let fixture: ComponentFixture<RegisterNoaccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNoaccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNoaccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
