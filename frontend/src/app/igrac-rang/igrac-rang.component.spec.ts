import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgracRangComponent } from './igrac-rang.component';

describe('IgracRangComponent', () => {
  let component: IgracRangComponent;
  let fixture: ComponentFixture<IgracRangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgracRangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgracRangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
