import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxPhoneComponent } from './textbox-phone.component';

describe('TextboxPhoneComponent', () => {
  let component: TextboxPhoneComponent;
  let fixture: ComponentFixture<TextboxPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextboxPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
