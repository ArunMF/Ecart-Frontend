import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  cartItemCount= new BehaviorSubject(0) // To hold cart item count

  searchTerm= new BehaviorSubject('') // To hold search value
  // Use BehaviorSubject to pass stream of data from one component to another component

  constructor(private http:HttpClient) { 
    this.cartCount()
  }

  BASE_URL = 'https://e-cart-app.onrender.com'
  // API function to get all products from the database
  getAllProducts(){
    return this.http.get(`${this.BASE_URL}/products/all-products`)
  }

  // api function to view a particular product from the database
  viewProduct(productid:string){
    return this.http.get(`${this.BASE_URL}/products/view-product/${productid}`)
  }

  // api function to add product to the wishlist
  addToWishlist(id:any,title:any,price:any,image:any){
    const body={
      id,
      title,
      price,
      image
    }
    return this.http.post(`${this.BASE_URL}/wishlists/add-to-wishlist`,body)
  }

  // api function to view all wishlist products
  viewWishlist(){
    return this.http.get(`${this.BASE_URL}/wishlists/view-all-wishlist`)
  }

  // api function to delete a particular item from wishlist
  deleteWislistProduct(id:any){
    return this.http.delete(`${this.BASE_URL}/wishlists/delete-wishlist-product/${id}`)
  }

  // api function to add product to cart
  addToCart(product:any){
    // get the product details - id,title,price,image,quantity
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }
    return this.http.post(`${this.BASE_URL}/carts/add-to-cart`,body)
  }

  // api function to get all cart products
  viewCart(){
    return this.http.get(`${this.BASE_URL}/carts/view-all-carts`)
  }

  // To get cart product count
  cartCount(){
    this.viewCart().subscribe((data:any)=>{
      this.cartItemCount.next(data.length)
    })
  }

  // Delete cart product
  deleteProduct(id:any){
    return this.http.delete(`${this.BASE_URL}/carts/delete-product/${id}`)
  }

  // Increment cart product
  incrementProduct(id:any){
    return this.http.get(`${this.BASE_URL}/carts/increment-product/${id}`)
  }

   // Decrement cart product
   decrementProduct(id:any){
    return this.http.get(`${this.BASE_URL}/carts/decrement-product/${id}`)
  }
}
