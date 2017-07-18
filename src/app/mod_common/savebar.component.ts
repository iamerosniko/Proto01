import { Component,Input,Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'save-bar',
  templateUrl: 'savebar.component.html',
})
export class SaveBarComponent {
  @Input() buttonMode:number;
  @Output() triggerParentFunc = new EventEmitter();

  buttonClicked(){
    this.triggerParentFunc.emit();
    if(this.buttonMode==0)
      alert("New Record has been successfully added.");
    else
      alert("Existing Record has been successfully updated.");
  }
}
