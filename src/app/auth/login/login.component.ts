import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router module

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  data: any;

  constructor(private http: HttpClient, private router: Router) {} // Inject Router module

  sendData() {
    console.log('Received email:', this.email);
    console.log('Received password:', this.password);

    let data = {
      userEmail: this.email,
      userPassword: this.password,
    };

    const url = 'http://localhost:8080/user/login';

    // Define headers
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', '*/*');

    // Make HTTP POST request
    this.http.post<any>(url, data, { headers }).subscribe(
      (response) => {
        data = response;
        console.log('Response from server:', response);

        // Check if response has a token
        if (response && response.token) {
          // Save token to local storage
          localStorage.setItem('jwtToken', response.token);
          localStorage.setItem('userEmail', response.userEmail);
          localStorage.setItem('userName', response.userName);
          
          console.log('JWT Token saved to local storage.');
          this.router.navigate(['/']); // Navigate to home page after successful login
        }
      },
      (error) => {
        console.error('Error:', error);
        // Handle error from server if needed
      }
    );
  }

  // logic to not to route login page when user already login
  ngOnInit(): void {
    if (localStorage.getItem('jwtToken')) {
      this.router.navigate(['/']);
    }
  }

}
