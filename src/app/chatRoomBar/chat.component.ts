import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnackbarComponent } from '../user/snackbar/snackbar.component';
import jsPDF from 'jspdf';
import { environment } from '../../environment/environment';

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
  

//active users
activeUsers = [];
activeuser:object = {}

  roomName:string = "Demo project"


  url :string = "";
  users: any;


  constructor(private http: HttpClient , private router : Router, private _snackBar: MatSnackBar) {
    console.log(this.router.url);
    this.url = this.router.url
  } // Inject Router module

  toggleDropdown(){

    this.dropdownOpen = !this.dropdownOpen;
    if(this.dropdownPeople == true){
      this.dropdownPeople = false;
    }
    const urls = environment.url+'/user/getEmail'

    if(this.dropdownOpen){
      this.http.get<any>(urls).subscribe(
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
    const url = environment.url+'/user/sendEmail';
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
  
  showJoinedUsers() {
    this.dropdownPeople = !this.dropdownPeople;
    if(this.dropdownOpen== true){
      this.dropdownOpen=false;
    }
    const url = environment.url+`/usersInRoom/${this.data}`
    console.log(typeof (this.data));
    if (this.dropdownPeople) {
      
      this.http.get<any>(url).subscribe(
        (response) => {
          console.log(response);
          if (response != null) {
            // Remove duplicates from the response array
            this.users = response.filter((user: any, index: number, self: any[]) =>
              index === self.findIndex((t: any) => (
                t.userId === user.userId
              ))
            );
          } else {
            console.log("error");
          }
        }
      );
    }
  
    console.log(this.dropdownPeople);
  }
  
  // text:any
  downloadPage() {
    console.log('Download');
    const url = environment.url+`/message/${this.data}`
     this.http.get<any[]>(url).subscribe((messages: any[]) => {
      const doc = new jsPDF();
      let y = 10; // Initial Y position for text
      const pageHeight = doc.internal.pageSize.height;
      
      messages.forEach(message => {
          const messageHeader = `${message.username} : ${message.content}`;
          const messageFooter = `(${message.createdDateTime}) - ${message.contentType}`;
          
          const headerLines = doc.splitTextToSize(messageHeader, 180); // Adjust width as needed
          const footerLines = doc.splitTextToSize(messageFooter, 180); // Adjust width as needed
          
          const headerHeight = headerLines.length * (doc.getLineHeight() / doc.internal.scaleFactor); // Calculate header height
          const footerHeight = footerLines.length * (doc.getLineHeight() / doc.internal.scaleFactor); // Calculate footer height
          
          const totalHeight = headerHeight + footerHeight;
          
          if (y + totalHeight > pageHeight - 10) { // Check if message exceeds page height
              doc.addPage(); // Add new page if needed
              y = 10; // Reset Y position for new page
          }
          
          // Draw header
          doc.text(headerLines, 15, y);
          
          // Draw footer
          doc.text(footerLines, 15, y + headerHeight);
          
          y += totalHeight + 5; // Add some padding between messages
      });
      
      doc.save('messages.pdf');
  }, (error) => {
      console.error('Failed to fetch messages:', error);
    });
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
