import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleVpnComponent } from './toggle-vpn.component';

describe('ToggleVpnComponent', () => {
  let component: ToggleVpnComponent;
  let fixture: ComponentFixture<ToggleVpnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleVpnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleVpnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
