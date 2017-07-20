import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms'
@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
})
export class ProfileComponent {
  testData: string;
  skillsetForm: FormGroup;
  skuName: string;
  

  constructor(fb: FormBuilder){
    this.testData = "Rico"

    this.skillsetForm = fb.group({
      'skuName': ['ft', Validators.required]
    });
    
  }

  onSubmit(form: any): void {
    console.log('you submitted value:', form);
    //this.testData = this.skillsetForm.controls.sku.value;

  }
}
