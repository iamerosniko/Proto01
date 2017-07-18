import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxNameComponent } from './textbox-name.component';

describe('TextboxNameComponent', () => {
  let component: TextboxNameComponent;
  let fixture: ComponentFixture<TextboxNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextboxNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
