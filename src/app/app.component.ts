import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'idBraProjet';
  selectedFile : File =null;

  constructor( private http : HttpClient){
    
  }

  onFileSelected(event){
    this.selectedFile =<File>event.target.files[0];
    alert(this.selectedFile);
  }

  onUpload(){
    this.http.post

  }

}
