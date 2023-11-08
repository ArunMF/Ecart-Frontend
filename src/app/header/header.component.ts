import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  cartCount:string='' // To hold cart count value
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.cartItemCount.subscribe((data:any)=>{
      console.log(data);
      this.cartCount=data
    })
  }
  search(event:any){
    console.log(event.target.value);
    this.api.searchTerm.next(event.target.value);
  }
}
