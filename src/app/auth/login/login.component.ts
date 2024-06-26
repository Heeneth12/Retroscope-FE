import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router module
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../user/snackbar/snackbar.component';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  data: any;
  durationInSeconds = 5;
  constructor(private http: HttpClient, private router: Router, private _snackBar: MatSnackBar) {} // Inject Router module

  sendData() {
    console.log('Received email:', this.email);
    console.log('Received password:', this.password);

    let data = {
      userEmail: this.email,
      userPassword: this.password,
    };

    const url =   environment.url +'/user/login';

    // Define headers
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('accept', '*/*');

    // Make HTTP POST request
    this.http.post<any>(url, data, { headers }).subscribe(
      (response) => {
        data = response;
        console.log('Response from server:', response);
        console.log(response.userId)

        // Check if response has a token
        if (response && response.token) {
          // Save token to local storage
          this._snackBar.openFromComponent(SnackbarComponent, {
            duration: this.durationInSeconds * 1000,
            data: { loggedIn: 0 } 
          });
          localStorage.setItem('jwtToken', response.token);
          localStorage.setItem('userEmail', response.userEmail);
          localStorage.setItem('userName', response.userName);
          localStorage.setItem('userId', response.userId);
          
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
