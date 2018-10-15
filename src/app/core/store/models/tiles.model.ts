
export interface Tile {
  id: number;
  title: string;
  image: string;
  url: string;
  position: number;
  colSpan: TileSizes;
  rowSpan: TileSizes;
}
export interface TileSizes {
  small: number;
  medium: number;
  large: number;
}
