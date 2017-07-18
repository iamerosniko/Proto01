import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'textbox-phone',
  templateUrl: './textbox-phone.component.html',
  styleUrls: ['./textbox-phone.component.css']
})
export class TextboxPhoneComponent implements OnInit {
  @Input() phone: string;
  //@Output() phoneChange = new EventEmitter();
  

  constructor() { }

  ngOnInit() {
  }

  // set onPhoneChange(val) {
  //   this.phoneChange = val;
  //   this.phoneChange.emit(this.phoneChange);
  // }
}
