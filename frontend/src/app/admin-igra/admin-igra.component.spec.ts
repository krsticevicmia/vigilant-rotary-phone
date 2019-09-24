import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminIgraComponent } from './admin-igra.component';

describe('AdminIgraComponent', () => {
  let component: AdminIgraComponent;
  let fixture: ComponentFixture<AdminIgraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminIgraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminIgraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
