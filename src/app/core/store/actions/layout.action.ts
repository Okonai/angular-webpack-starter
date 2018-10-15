import { Action } from '@ngrx/store';

export const TOGGLE_MAIN_MENU = '[Layout] Toggle Main menu';
export const OPEN_MAIN_MENU = '[Layout] Open Main menu';
export const CLOSE_MAIN_MENU = '[Layout] Close Main menu';
export const TOGGLE_SEARCH = '[Layout] Toggle Search';
export const OPEN_SEARCH = '[Layout] Open Search';
export const CLOSE_SEARCH = '[Layout] Close Search';
export const UPDATE_CURRENT_BREAKPOINT = '[Layout] Update Current Breakpoint';
export const UPDATE_STORE_SITE = '[Site] Update Site';

export const RESOLVE_URL = '[UrlResolver] Resolve Url';
export const RESOLVE_URL_SUCCESS = '[UrlResolver] Resolve Url Success';
export const RESOLVE_URL_ERROR = '[UrlResolver] Resolve Url Error';
export const UPDATE_STORE_IMAGE = '[Layout] Update Store Image';

export class ToggleMainMenu implements Action {
  readonly type = TOGGLE_MAIN_MENU;
  constructor(public payload?: any) {}
}

export class OpenMainMenu implements Action {
  readonly type = OPEN_MAIN_MENU;
  constructor(public payload?: any) {}
}

export class CloseMainMenu implements Action {
  readonly type = CLOSE_MAIN_MENU;
  constructor(public payload?: any) {}
}

export class ToggleSearch implements Action {
  readonly type = TOGGLE_SEARCH;
  constructor(public payload?: any) {}
}

export class OpenSearch implements Action {
  readonly type = OPEN_SEARCH;
  constructor(public payload?: any) {}
}

export class CloseSearch implements Action {
  readonly type = CLOSE_SEARCH;
  constructor(public payload?: any) {}
}

export class UpdateCurrentBreakpoint implements Action {
  readonly type = UPDATE_CURRENT_BREAKPOINT;

  constructor(public payload?: { windowSize: number }) {}
}

export class UpdateStoreImage implements Action {
  readonly type = UPDATE_STORE_IMAGE;

  constructor(public payload?: { image: string }) {}
}

export class UpdateStoreSite implements Action {
  readonly type = UPDATE_STORE_SITE;

  constructor(public payload?: { site: string }) {}
}

export class ResolveUrlAction implements Action {
  public type: string = RESOLVE_URL;
  constructor(public payload?: { slug: string }) {}
}

export class ResolveUrlErrorAction implements Action {
  public type: string = RESOLVE_URL_ERROR;
  constructor(public payload?: any) {}
}

export class ResolveUrlSuccessAction implements Action {
  public type: string = RESOLVE_URL_SUCCESS;
  constructor(public payload?: { controllerName: string, id: number }) {}
}

export type LayoutActions
  = ToggleMainMenu
  | OpenMainMenu
  | CloseMainMenu
  | ToggleSearch
  | OpenSearch
  | CloseSearch
  | UpdateCurrentBreakpoint
  | ResolveUrlAction
  | ResolveUrlErrorAction
  | ResolveUrlSuccessAction
  | UpdateStoreSite
  | UpdateStoreImage
  ;
