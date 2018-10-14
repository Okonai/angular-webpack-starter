export interface Seo {
  tags: SeoTag[];
}

export interface SeoTag {
  tag: string;
  property: any;
  content: string;
}
