import { Task } from './../models/task';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl= "http://localhost:1997/tasks";

  constructor(private http :HttpClient) { }

  getAll(){
    return this.http.get<Task[]>(this.apiUrl);
  }
  delete(id){
    return this.http.delete(this.apiUrl+"/"+id);
  }

  persist(task){
    return this.http.post<Task>(this.apiUrl,task);
    
  }

  completed(id , comp){
    return this.http.patch(this.apiUrl+"/"+id , {completed : !comp})
  }

  update(task){
    return this.http.put(this.apiUrl+"/"+task.id,task);
  }
}
