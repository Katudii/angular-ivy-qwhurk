import { Component, Input, OnInit } from '@angular/core';
import { PRICE_LIST, ProductWithPrice, PRODUCT_LIST } from '../data';

@Component({
  selector: 'app-page-marketing',
  templateUrl: './page-marketing.component.html',
  styleUrls: ['./page-marketing.component.scss'],
})
export class PageMarketingComponent implements OnInit {
  products = this.getProductsAndPrices();

  cart: any = {};

  constructor() {}

  ngOnInit() {
    this.cart.products = [];
    this.cart.total = 0;
  }

  getProductsAndPrices(): ProductWithPrice[] {
    const products = PRODUCT_LIST;
    const prices = PRICE_LIST;
    const finalList : ProductWithPrice[] = []
    
    products.forEach((product)=>{
      const linkPriceProduct = prices.find(function(price){ return (product.sku == price.sku && price.price && price.price > 0)})
      if(linkPriceProduct){
        let pp :ProductWithPrice = {
          sku : product.sku,
          name : product.name,
          image : product.image,
          price : linkPriceProduct.price,
          discount : linkPriceProduct.discount
        }
        finalList.push(pp)
      }
    })
    return finalList
  }

  addProductToCart(product: ProductWithPrice) {
    this.cart?.products.push(product);
    this.cart.total = product.price;
  }
}
