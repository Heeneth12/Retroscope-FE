import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from '../user/snackbar/snackbar.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent  {

  @Input() data: string | null = null;

  dropdownOpen:boolean  =false;
  dropdownPeople: boolean = false;
  emails = [ ]
  durationInSeconds = 5;
  

  roomName:string = "Demo project"


  url :string = "";
users: any;

  constructor(private http: HttpClient , private router : Router, private _snackBar: MatSnackBar) {
    console.log(this.router.url);
    this.url = this.router.url
  } // Inject Router module


  toggleDropdown(){

    this.dropdownOpen = !this.dropdownOpen;

    if(this.dropdownOpen){
      this.http.get<any>('http://localhost:8080/user/getEmail').subscribe(
        (response) => {
          console.log(response)
          if(response != null){
            this.emails = response
          }
          else{
            console.log("error")
          }
        }
      )
    }
    console.log(this.dropdownOpen)

  }


  SendEmail(email:string) {
    const url = 'http://localhost:8080/user/sendEmail'
    const headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .set('link', this.router.url);
    const emailId = {
      "userEmail" : email
    }
    console.log(this.router.url)
    console.log(emailId)
    this.http.post<any>(url,emailId, {headers}).subscribe(
      (response) => {
        if(response.Status == "OK"){
          this._snackBar.openFromComponent(SnackbarComponent, {
            duration: this.durationInSeconds * 1000,
            data: { loggedIn: 2 } 
          });
        }else{
          console.log("error")
        }
      }
    )
  }
  
  showJoinedUsers(){
    this.dropdownPeople = !this.dropdownPeople
    console.log(typeof(this.data))
    if(this.dropdownPeople){
      this.http.get<any>(`http://localhost:8080/usersInRoom/${this.data}`).subscribe(
        (response) => {
          console.log(response)
          if(response != null){
            this.users = response
          }
          else{
            console.log("error")
          }
        }
      )
    }
    
    console.log(this.dropdownPeople)

  }


  
  dataToggle:boolean =false;

  // messageTypeCount:any= {};
  // reportData() {
  //   const url = `http://localhost:8080/message/analysisMessage/${this.data}`;
  //   this.http.get<any>(url).subscribe((Response) => {
  //     console.log(Response);
  //     this.messageTypeCount = Response
  //     this.dataToggle = !this.dataToggle
  //     console.log(this.dataToggle)
      
  //   });
  // }

}
