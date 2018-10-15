export interface News {
  'news': NewsItem[];
}

export interface NewsItem {
  id: number;
  image: string;
  date_from: string;
  short_description: string;
  is_highlight: boolean;
}
