import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit  {

  roomData:any;
  formToggleVer:boolean = false;


  constructor(private http: HttpClient, private router: Router) {}


  ngOnInit(): void {
    this.getRoomData()
  }

  formToggle(){
    this.formToggleVer = !this.formToggleVer
  }

getRoomData(){
  const url = "http://localhost:8080/get";
  this.http.get<any>(url).subscribe(
    (response) => {
      console.log(response)
      this.roomData = response
    }
  )
}
}
