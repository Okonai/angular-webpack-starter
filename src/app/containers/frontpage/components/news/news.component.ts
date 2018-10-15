import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {News, NewsItem} from "../../../../core/store/models/news.model";
import * as fromStore from "../../../../core/store/index";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class NewsComponent implements OnInit {

  news$: Observable<NewsItem[][]>;

  constructor(private store: Store<fromStore.MainState>) { }

  ngOnInit() {
    this.news$ = this.store.select(fromStore.getNews);
    this.store.dispatch(new fromStore.LoadNews);
  }

}
