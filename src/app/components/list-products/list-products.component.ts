import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {Categories} from "../../models/categories";
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/product";


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {

  @Input() activeGender!: string;
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  treeData!: TreeNode[];
  categories!: Categories[];

  constructor(private cartService: CartService,
              private router: Router,
              private categoryService: CategoryService,
              private productService: ProductService) {
  }

  ngOnInit(): void {
    this.loadCategories("Clothes");
    if (this.treeData.length != 0){

    }
  }

  toggleActive(gender: string) {
    if (this.activeGender != gender) {
      this.activeGender = gender;
      this.cartService.SetGenderSelected(gender)
    }
  }

  goToPage(page: number): void {

  }

  loadCategories(categoryName: string): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(data)
      this.treeData = this.categories.reduce((acc: TreeNode[], category) => {
        // Find or create the parent category node
        let categoryNode = acc.find((node) => node.name === category.name);
        if (!categoryNode) {
          categoryNode = { name: category.name, expanded: true, children: [] };
          acc.push(categoryNode);
        }

        // Find or create the main subcategory node
        let subcategoryNode = categoryNode.children.find(
          (child) => child.name === category.subcategory
        );
        if (!subcategoryNode) {
          subcategoryNode = { name: category.subcategory, expanded: false, children: [] };
          categoryNode.children.push(subcategoryNode);
        }

        // Add deeper subcategories (subcategory1, subcategory2) to the subcategory node
        if (category.subcategory1) {
          const subcategory1Node = subcategoryNode.children.find(
            (child) => child.name === category.subcategory1
          );
          if (!subcategory1Node) {
            subcategoryNode.children.push({
              name: category.subcategory1,
              expanded: false,
              children: []
            });
          }
        }

        if (category.subcategory2) {
          const subcategory2Node = subcategoryNode.children.find(
            (child) => child.name === category.subcategory2
          );
          if (!subcategory2Node) {
            subcategoryNode.children.push({
              name: category.subcategory2,
              expanded: false,
              children: []
            });
          }
        }

        return acc;
      }, []);
    });
  }

  toggleNode(node: TreeNode, event: MouseEvent) {
    node.expanded = !node.expanded;
    event.stopPropagation(); // Prevent toggling parent nodes when clicking on a child
  }

  getProductByCategory(categoryName:String){
    this.productService.getProductsByCategory(categoryName).subscribe(
      (data) => {
        this.products = data;
        console.log(data)
      }
    )
  }
  getProductsBySubCategory(SubCategoryName:String){
    this.productService.getProductsBySubCategory(SubCategoryName).subscribe(
      (data) => {
        this.products = data;
        console.log(data)
      }
    )
  }
  getProductsBySubCategory1(SubCategoryName1:String){
    this.productService.getProductsBySubCategory1(SubCategoryName1).subscribe(
      (data) => {
        this.products = data;
        console.log(data)
      }
    )
  }
  getProductsBySubCategory2(SubCategoryName2:String){
    this.productService.getProductsBySubCategory2(SubCategoryName2).subscribe(
      (data) => {
        this.products = data;
        console.log(data)
      }
    )
  }

  products: Product[] = []
    isMenuOpen = false;
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}

interface TreeNode {
  name: string;
  expanded: boolean;
  children: TreeNode[];
}

