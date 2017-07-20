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
  acs: Associate;
  departments: any;
  locations: any;
  
  constructor(fb: FormBuilder  ){
    this.skillsetFrm = fb.group({
      'UserName': [{value: '', disabled: true}, Validators.required],
      'Department': [1],
      'Location': [1]
    });
  }
  
  ngOnInit():void {
    this.acs = new Associate(
      0,
      "rty",
      "",
      false,
      2,
      3,
      new Date(),
      false
    );

    this. departments = [
       {id: 1, name: "Admin"},
       {id: 2, name: "Marketing"},
       {id: 3, name: "Sales"}
     ];

     this.locations = [
       {id: 1, name: "New York"},
       {id: 2, name: "Los Angeles"},
       {id: 3, name: "Houston"}
     ];
    
}

  onSubmit(form: any): void {
    console.log('you submitted value:', form);
    //this.testData = this.skillsetForm.controls.sku.value;

  }
}
