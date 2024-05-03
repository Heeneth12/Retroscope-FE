import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../snackbar/snackbar.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {


  selectedTab: number = 0;
  Uname: string | undefined; // Example name
  email: string | undefined; // Example email
  password: string = "********"; // Example password

  token:string|null = localStorage.getItem('jwtToken')
  selectTab(tab: number) {
    this.selectedTab = tab;
    console.log(this.selectedTab)
  }

  
changePic() {
throw new Error('Method not implemented.');
}
  oldPassword: string | undefined;
  newPassword: string | undefined;
  newEmail: string | undefined;
  newName: string | undefined;
  name: string | undefined;
  durationInSeconds = 5;
  
  // token = localStorage.getItem('token');
  


  constructor(public dialog: MatDialog, private http: HttpClient , private header : HttpHandler, private _snackBar: MatSnackBar,) {}
  ngOnInit(): void {
    this.getUserByToken();
    
  }
  
  getUserByToken(){
    const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .set('token', this.token!);

     const url = 'http://localhost:8080/user/getUserByToken';
    
      
      this.http.get<any>( url, {headers}).subscribe(Response =>{
        console.log(Response)
        if(Response != null){
          this.Uname = Response.userName
          this.email = Response.userEmail
          
          console.log(Response.userName)
          console.log(Response.userEmail)
          
        }
      })
          
  }

  openchangeNameDialog(): void {
    
  }
  openChangeEmailDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { name: "Email" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      
      this.newEmail = result.content;
      const data = 
      {
        userEmail: this.newEmail
      }
      
      console.log(this.newEmail)

      if (this.newEmail === null) {
        return;
      }
      // Check if token exists
      // if (!this.token) {
      //   console.error('Token not found in localStorage');
      //   return; // or handle the absence of token appropriately
      // }
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im5pa2hpbCJ9.59lIdod1HHMnBjKLuxLeyJAxuUHyWIsGYuMsDSUM-YQ');
      
  
      this.http.put<any>('http://localhost:8080/user/changeEmail', data, {headers})
        .subscribe(
          (response => {
            console.log(response)
            if(response.Status === "OK"){
              console.log('successful');
              this.email = this.newEmail;
              this._snackBar.openFromComponent(SnackbarComponent, {
                duration: this.durationInSeconds * 1000,
                
              });
            
            } else{
              console.error('failed:', response);
            }
            
          }),
          (error: any) => {
            // Handle login error
            console.error('HTTP error:', error);
            // Optionally, display an error message to the user
          }
        );
    });
  }

  openChangePasswordDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: { name: "New Password" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.oldPassword = result.pass;
      this.newPassword = result.content;

      if (this.newPassword === null && this.oldPassword === null) {
        return;
      }
      // Check if token exists
      // if (!this.token) {
      //   console.error('Token not found in localStorage');
      //   return; // or handle the absence of token appropriately
      // }
      const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Im5payJ9.u2WJDpd7tYadMuK7P7jwpTzOiCtBM84W7jRVdLyp0ME');
      const body = {
        oldPassword : this.oldPassword,
        newPassword : this.newPassword
      }
      // const headers = {
      //   token : this.token
      // }
      
  
      this.http.put<any>('http://localhost:8080/user/changePassword', body, {headers})
        .subscribe(
          (response => {
            if(response.Status === "OK"){
              console.log('successful');
              this._snackBar.openFromComponent(SnackbarComponent, {
                duration: this.durationInSeconds * 1000,
                
              });
            
            } else{
              console.error('failed:', response);
            }
            
          }),
          (error: any) => {
            // Handle login error
            console.error('HTTP error:', error);
            // Optionally, display an error message to the user
          }
        );
      
    });
  }

}
