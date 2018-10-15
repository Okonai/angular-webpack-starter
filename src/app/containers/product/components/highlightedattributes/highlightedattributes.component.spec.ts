import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightedattributesComponent } from './highlightedattributes.component';

describe('HighlightedattributesComponent', () => {
  let component: HighlightedattributesComponent;
  let fixture: ComponentFixture<HighlightedattributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightedattributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightedattributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
