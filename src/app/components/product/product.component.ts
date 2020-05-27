import { ProductService } from './../../services/product.service';
import { Product } from './../../models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  showForm =false;
  
  product  ={
    id : Math.random(),
    ref : "",
    name :""
  }
  editForm =false;

  resetProduct(){
    this.product  ={
      id : Math.random(),
      ref : "",
      name :""
    }
  }

  constructor(public proSer :ProductService) { 
    this.product.id =Math.random();
  }
  produit : Product[];

  ngOnInit(): void {
    this.findAllProduct();
  }
 findAllProduct(){
   this.proSer.getAll()
   .subscribe(
     tasj =>  {
       this.produit=tasj;
     }
   )
 }

 newTask(){
   this.showForm = !this.showForm
  
 }
 editFormPro(){
  this.editForm = !this.editForm;
}

 updateProduct(){
  
    this.proSer.update(this.product)
                    .subscribe(task=>{
                      this.resetProduct();
                      this.editFormPro();
                      this.newTask();
                    }
                    
                    )
  
 }
 IsUpdateProduct(){
   this.editForm =! this.editForm;
 }

 persistProduit(){
   this.proSer.save(this.product).subscribe((pro)=>{
    this.produit =[pro, ...this.produit]
     this.product.name = "";
     this.product.ref ="";
     
     
   })

 }

 editPro(task){
   this.product=task;
   this.IsUpdateProduct();
   this.newTask();

 }
 toggleCompleted(task){

 }
 deletePro(product){
   this.proSer.supp(product.id).subscribe(
     ()=>{
       let index:any = this.produit.indexOf(product);
       this.produit.splice(index,1);
     }
   )
 }
}
