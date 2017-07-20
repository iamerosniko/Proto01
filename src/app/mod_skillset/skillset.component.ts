import { Component, OnInit } from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms'
import { Associate } from '../com_entities/entities';

@Component({
  selector: 'skillset',
  templateUrl: 'skillset.component.html',
})

export class SkillSetComponent {
  skillsetFrm: FormGroup;
  acs: Associate
  
  constructor(fb: FormBuilder  ){
    this.skillsetFrm = fb.group({
      'UserName': [{value: '', disabled: true}, Validators.required]
    });
  }
  
  ngOnInit():void {
    this.acs = new Associate(
      0,
      "rty",
      "",
      false,
      0,
      0,
      new Date(),
      false
    );
    
}

  onSubmit(form: any): void {
    console.log('you submitted value:', form);
    //this.testData = this.skillsetForm.controls.sku.value;

  }
}
