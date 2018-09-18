import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GithubService {

  constructor(public http: Http) { }

getUserDetails(){
 return this.http.get("https://api.github.com/users/random").map(res => res.json());
}
}
