import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import * as fromStore from "../../../../core/store/index";
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  	constructor(
		private store: Store<fromStore.MainState>,
		private router: Router,
	) { }

	ngOnInit() {
		this.store.dispatch(new fromStore.AuthLogout({}));
		setTimeout(() => {
			this.router.navigate(['/']);
		},2000);
	}

}
