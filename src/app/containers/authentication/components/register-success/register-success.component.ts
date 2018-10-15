import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import * as fromStore from "../../../../core/store/index";
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-success',
  templateUrl: './register-success.component.html',
  styleUrls: ['./register-success.component.scss']
})
export class RegisterSuccessComponent implements OnInit {
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
