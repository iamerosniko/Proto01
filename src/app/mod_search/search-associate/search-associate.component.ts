import { Component, OnInit, Input } from '@angular/core';
import { AssociateRpt,DepartmentSkills } from '../../com_entities/entities';
@Component({
  selector: 'search-associate',
  templateUrl: './search-associate.component.html',
  styleUrls: ['./search-associate.component.css']
})
export class SearchAssociateComponent implements OnInit {
@Input() s:any;
  constructor() { }

  ngOnInit() {
  }

}
