import { Task } from './../../models/task';
import { TaskService } from './../../services/task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  showForm =false;
  editForm = false;
  textSearch ='';

  myTask :Task ={
    label :'',
    completed :false
  }

  constructor(private taskService : TaskService) { }

  tasks : Task[] =[];
  resultTasks : Task[] =[];

  ngOnInit(): void {
    this.getTasks();


  }

getTasks(){

  this.taskService.getAll()
   .subscribe(
     tasks => {this.resultTasks =this.tasks=tasks} 
   )
  
}

deleteTasks(id){
  this.taskService.delete(id)
                   .subscribe(
                     ()=>{
                      this.tasks =this.tasks.filter(task => task.id != id) 
                     }
                   )
}

persistTask(){
  this.taskService.persist(this.myTask)
                  .subscribe(
                    (task)=>{
                      this.tasks =[task, ...this.tasks]
                     this.resetTask();
                     this.newTask();
                    }
                  )

}
resetTask(){
  this.myTask={
    label :'',
    completed :false
  }

}

toggleCompleted(task){
  this.taskService.completed(task.id,task.completed)
  .subscribe(
    ()=>{
      task.completed = !task.completed
    }
  )
}

edit(task){
  this.myTask=task;
  this.editFormTask();
  this.newTask();
}

editFormTask(){
  this.editForm = !this.editForm;
}

updateTask(){
  this.taskService.update(this.myTask)
                  .subscribe(task=>{
                    this.resetTask();
                    this.editFormTask();
                    this.newTask();
                  }
                  
                  )
}

newTask(){
  this.showForm = ! this.showForm;
}

searchTasks(){
 
  this.resultTasks =this.tasks.filter( //filter comme foreach
    (task)=> task.label.toLocaleLowerCase().includes(this.textSearch.toLocaleLowerCase())
  )
  
}

  }


