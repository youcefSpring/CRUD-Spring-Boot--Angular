import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl= "http://localhost:8082/product";

  constructor(private http :HttpClient) { }

  getAll(){
    return this.http.get<Product[]>(this.apiUrl);
  }

  save(produit){
    return this.http.post<Product>(this.apiUrl+"/save",produit);
  }
  update(produit){
    return this.http.put<Product>(this.apiUrl+"/edit",produit);
  }
  supp(id){
    return this.http.delete(this.apiUrl+"/delete/"+id)
  }
}
