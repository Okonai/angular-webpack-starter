import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as fromStore from "../../../../core/store/index";
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-success',
  templateUrl: './login-success.component.html',
  styleUrls: ['./login-success.component.scss']
})
export class LoginSuccessComponent implements OnInit {
	
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
