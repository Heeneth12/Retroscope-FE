import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  roomData: any;
  formToggleVer: boolean = false;
  token:string|null = localStorage.getItem('jwtToken')

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getRoomData();
  }

  formToggle() {
    this.formToggleVer = !this.formToggleVer;
  }

  getRoomData() {
    const url = 'http://localhost:8080/get';
     // Define headers
     const headers = new HttpHeaders()
     .set('Content-Type', 'application/json')
     .set('accept', '*/*')
     .set('token' , this.token!);
   
    this.http.get<any>(url, {headers}).subscribe((response) => {
      console.log(response);
      this.roomData = response;
    });
  }
}
