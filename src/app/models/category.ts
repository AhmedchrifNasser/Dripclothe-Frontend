import {Subcategory} from './subcategory';

export class Category {
  id!: number;
  name!: string;
  groupId!: number;
  subcategories!: Subcategory[];
}
