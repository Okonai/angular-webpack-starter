import * as fromStore from '../store';
import { Meta, Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ResolvedUrl } from '../store/models/urlresolver.model';

@Injectable()
export class SeoResolver implements Resolve<ResolvedUrl> {

  constructor(
    private _Meta: Meta,
    private _Title: Title,
    private _store: Store < fromStore.MainState > ,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Promise<ResolvedUrl> {
    const slug = (route.params.slug) ? route.params.slug.toString().replace(/\-([csarp])([0-9]+)$/i, '') : 'alma';
    this._store.dispatch(new fromStore.LoadSeoAction({ slug: slug }));
    return new Promise<ResolvedUrl>(resolve => {
      this._store.select(fromStore.getSeo).skip(1).subscribe((tags) => {
        let self = this;
        Object.keys(tags).forEach(function (key) {
          if (tags[key].tag === 'meta') {
            const name = ('property' in tags[key].property) ? tags[key].property.property : tags[key].property.name;
            self._Meta.addTag({ name: name, content: tags[key].property.content });
          }

        });
        resolve(
          null
        );
      });
    });
  }
}
