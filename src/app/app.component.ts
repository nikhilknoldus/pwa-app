import { Component, OnInit } from '@angular/core';
import { GithubService } from './github.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public githubService:GithubService){}
  title = 'app';
  resData:any={};

  ngOnInit(){
    setTimeout(()=>{
    this.gethere()
     }, 200)
  }


  gethere(){
   this.githubService.getUserDetails().subscribe(val => this.resData = val);
  }
}
