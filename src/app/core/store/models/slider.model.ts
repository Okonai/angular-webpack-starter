export interface Slider {
  slideshow: Slide[];
  slideshow_mobile: Slide[];
}

export interface Slide {
  id: number;
  title: string;
  url: string;
  image: string;
  image2?: string;
  image3?: string;
}
