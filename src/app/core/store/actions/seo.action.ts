import { Action } from '@ngrx/store';

export const seoActionTypes = {
  LOAD: '[Seo] Load',
  LOAD_ERROR: '[Seo] Load Error',
  LOAD_SUCCESS: '[Seo] Load Success',
};
/**
 * Load Seo Actions
 */
export class LoadSeoAction implements Action {
  readonly type = seoActionTypes.LOAD;

  constructor(public payload: {slug: string}) { }
}

export class LoadSeoSuccessAction implements Action {
  readonly type = seoActionTypes.LOAD_SUCCESS;

  constructor(public payload: any) { }
}

export class LoadSeoErrorAction implements Action {
  readonly type = seoActionTypes.LOAD_ERROR;

  constructor(public payload: any) { }
}

export type SeoActions =
  | LoadSeoAction
  | LoadSeoSuccessAction
  | LoadSeoErrorAction
  ;
