import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';
environment
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
passkeyInput: string | undefined;


  @ViewChild('joinButton')
  joinButton!: ElementRef;

showPasskeyInputVer: boolean= false;

  roomData: any;
  formToggleVer: boolean = false;
  token:string|null = localStorage.getItem('jwtToken')
  passKey: any;
  joinButtonVisible: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.getRoomData();
  }

  formToggle() {
    this.formToggleVer = !this.formToggleVer;
  }

  getRoomData() {
    const url =  environment.url+'/get';
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
  checkPassKey(item: any) {
    // Your logic to check if the passkey entered by the user is correct
    if (item.passKey === "yourPassKey") { // Replace "yourPassKey" with the actual passkey
        item.passKeyEntered = true;
        // Redirect the user to the chat room
    } else {
        // Display an error message or handle invalid passkey scenario
    }
}



  showPasskeyInput(item: any) {
    // Set showPasskeyInput to true for the current room item
    this.roomData.forEach((room: { showPasskeyInput: boolean; }) => {
        room.showPasskeyInput = false; // Hide passkey input for other rooms
    });
    item.showPasskeyInput = true; // Show passkey input for the current room
}

checkRoomPassKey(roomId: string, passkeyInput: string | undefined , roomName : string) {
  if (passkeyInput !== undefined) {
    // Call your API or perform other actions using roomId and passkeyInput
    const url =  environment.url+ '/roomPasskey';
    const data = {
      roomId: roomId,
      roomPassKey: passkeyInput
    };

    this.http.post<any>(url, data).subscribe(
      (response) => {
        console.log(response);
        if (response.status === "success") {
         this.router.navigate(['/chat', roomId , roomName])
        }
      },
      (error) => {
        // Handle error if needed
      }
    );
  } else {
    // Handle the case when passkeyInput is undefined
  }
}
}
