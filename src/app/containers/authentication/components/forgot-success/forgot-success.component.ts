import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as fromStore from "../../../../core/store/index";
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgot-success',
  templateUrl: './forgot-success.component.html',
  styleUrls: ['./forgot-success.component.scss']
})
export class ForgotSuccessComponent implements OnInit {

  	constructor(
		private store: Store<fromStore.MainState>,
		private router: Router,
	) { }

	ngOnInit() {
		setTimeout(() => {
			this.store.dispatch(new fromStore.AuthReset({}));
			this.router.navigate(['/']);
		},2000);
	}

}
