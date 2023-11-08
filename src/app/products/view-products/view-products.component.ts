import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit{
  productId:string=''
  product:any=[]
  constructor(private activaterouter:ActivatedRoute, private api:ApiService){}
  ngOnInit(): void {
    this.activaterouter.params.subscribe((data:any)=>{
      console.log(data);
      this.productId=data.id;
      console.log(this.productId);
      
      this.api.viewProduct(this.productId).subscribe((result:any)=>{
        console.log(result);
        this.product=result
      },
      (result:any)=>{
        alert(result.error)
      }
      )
    })
  }

  addToWishlist(){
    const {id,title,price,image} = this.product
    this.api.addToWishlist(id,title,price,image).subscribe((result:any)=>{
      alert(result)
    },
    (result:any)=>{
      alert(result.error)
    }
    )
  }

  addToCart(product:any){
    // add product quantity to product object
    Object.assign(product,{quantity:1})
    console.log(product);
    
    // api call to add quantity to cart
    this.api.addToCart(product).subscribe((result:any)=>{
      alert(result)
      this.api.cartCount()
    },
  (result:any)=>{
    alert(result.error)
  }    
    )
  }
}
