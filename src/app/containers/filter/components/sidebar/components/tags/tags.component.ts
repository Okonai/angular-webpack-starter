import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Tags } from '../../../../../../core/store/models/filter.model';
import * as fromStore from "../../../../../../core/store";
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

	public tagInput:string;
	tags$: Observable<string[]>;
	constructor(private store: Store<fromStore.MainState>) { }

	public addTag(){
		if(this.tagInput && this.tagInput != "" && this.tagInput.trim() && this.tags$.filter((x,idx) => x[idx] && x[idx] == this.tagInput.trim()).subscribe(result => result.length)){
			this.store.dispatch(new fromStore.FilterTagAdd(this.tagInput));
			this.tagInput = "";
		}
	}
	public removeTag(tag:string){
		this.store.dispatch(new fromStore.FilterTagRemove(tag));
	}
	ngOnInit() {
		this.tags$ = this.store.select(fromStore.getFilterTags);
  	}

}
