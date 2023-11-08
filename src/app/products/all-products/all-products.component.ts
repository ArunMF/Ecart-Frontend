import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{
  searchkey:string=''
  allProducts:any=[];
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.api.getAllProducts().subscribe((result:any)=>{
      console.log(result);
      this.allProducts=result;
    })

    // this.searchkey=this.api.searchTerm;
    this.api.searchTerm.subscribe((result:any)=>{
      this.searchkey=result;
      console.log(this.searchkey);
      
    })

  }
}
