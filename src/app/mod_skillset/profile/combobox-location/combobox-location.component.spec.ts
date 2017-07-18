import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxLocationComponent } from './combobox-location.component';

describe('ComboboxLocationComponent', () => {
  let component: ComboboxLocationComponent;
  let fixture: ComponentFixture<ComboboxLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboboxLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboboxLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
