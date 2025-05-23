import {Style} from "./style";
import {Color} from "./color";
import {Photo} from "./photo";
import {Size} from "./size";
import {Categories} from "./categories";

export class Product {
  id!: number;
  name!: string;
  description!: string;
  price!: number;
  style!: Style;
  sizes!: Size[];
  colors!: Color[];
  photos!: Photo[];
  shippingFee!: number;
  categories!: Categories;
}
