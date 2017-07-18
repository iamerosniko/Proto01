import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxUpdatedComponent } from './textbox-updated.component';

describe('TextboxUpdatedComponent', () => {
  let component: TextboxUpdatedComponent;
  let fixture: ComponentFixture<TextboxUpdatedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextboxUpdatedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxUpdatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
