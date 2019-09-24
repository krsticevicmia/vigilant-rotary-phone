import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperGeoComponent } from './super-geo.component';

describe('SuperGeoComponent', () => {
  let component: SuperGeoComponent;
  let fixture: ComponentFixture<SuperGeoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperGeoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperGeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
