import { Action } from '@ngrx/store';
import { Banner } from './banner.model';

// tslint:disable-next-line:variable-name
export const BannerActionTypes = {
  LOAD: '[Banner] Load',
  LOAD_ERROR: '[Banner] Load Error',
  LOAD_SUCCESS: '[Banner] Load Success',
};
/**
 * Load Banner Actions
 */
export class LoadBannerAction implements Action {
  readonly type = BannerActionTypes.LOAD;

  constructor (public payload: any) { }
}

export class LoadBannerSuccessAction implements Action {
  readonly type = BannerActionTypes.LOAD_SUCCESS;

  constructor (public payload?: any) { }
}

export class LoadBannerErrorAction implements Action {
  readonly type = BannerActionTypes.LOAD_ERROR;

  constructor (public payload: any) { }
}

export type BannerActions =
  | LoadBannerAction
  | LoadBannerSuccessAction
  | LoadBannerErrorAction
  ;
