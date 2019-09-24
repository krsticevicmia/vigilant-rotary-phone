import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperPojamComponent } from './super-pojam.component';

describe('SuperPojamComponent', () => {
  let component: SuperPojamComponent;
  let fixture: ComponentFixture<SuperPojamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuperPojamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperPojamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
