import { Component, OnInit, Input } from '@angular/core';
import { Category } from '@models/filter.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  @Input() categories: Category[];
  @Input() parentForm: FormGroup;

	constructor() { }

	ngOnInit() {
    
  }    
}
