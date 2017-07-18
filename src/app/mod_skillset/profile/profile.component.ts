import { Component } from '@angular/core';
@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
})
export class ProfileComponent {
  testData: string;

  constructor(){
    this.testData = "Rico"
  }
}
