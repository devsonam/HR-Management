import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  tokenno:string; //new line
  constructor() { }
  
  ngOnInit(): void {
	   this.tokenno = sessionStorage.getItem("tokenno"); // new line
  }
  
  logout(){
    sessionStorage.clear();
    window.location.reload();
  }

}
