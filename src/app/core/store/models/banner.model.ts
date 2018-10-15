export interface Banner {
  id: number;
  title: string;
  url: string;
  image: string[];
}


export interface BannerFilter {
  id: number;
  banner_id: number;
  show_list_page: boolean;
  show_between_products: boolean;
  image: string;
  active: boolean;
  url: string;
}
