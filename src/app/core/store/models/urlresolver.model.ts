export interface ResolvedUrl {
  controllerName: string;
  breadCrumb: ParentCrumb[];
  id: number;
}

export interface Crumb {
  id: number;
  name: string;
  slug: string;
}

export interface ParentCrumb extends Crumb {
  childs: Crumb[];
}
