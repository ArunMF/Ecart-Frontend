import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{
  allWishlist:any=[]
constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.viewWishlist().subscribe((data:any)=>{
      console.log(data);
      this.allWishlist=data;
    })
  }
  deleteWishlistProduct(id:any){
    this.api.deleteWislistProduct(id).subscribe((result:any)=>{
      this.allWishlist=result;
      alert("Product removed successfully.")
    })
  }
}
