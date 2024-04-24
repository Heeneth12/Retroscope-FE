import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrl: './reg.component.css'
})
export class RegComponent {
  constructor(private http: HttpClient, private router: Router) {}

  userRegData = new FormGroup({
    userName: new FormControl(),
    userEmail: new FormControl(),
    userPassword: new FormControl(),
    userPhoneNo: new FormControl(),
  });

  registerUser() {
    const url = 'http://localhost:8080/user/register';
    const formData = this.userRegData.value;
    this.http.post(url, formData).subscribe((response) => {
      console.log(response);
       const test = response;
      
        this.router.navigate(['/login']);

      
    });
    
  }

  ngOnInit(): void {
    if (localStorage.getItem('jwtToken')) {
      this.router.navigate(['/']);
    }
  }

}
