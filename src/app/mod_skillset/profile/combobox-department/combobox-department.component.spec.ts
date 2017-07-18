import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxDepartmentComponent } from './combobox-department.component';

describe('ComboboxDepartmentComponent', () => {
  let component: ComboboxDepartmentComponent;
  let fixture: ComponentFixture<ComboboxDepartmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboboxDepartmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboboxDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
