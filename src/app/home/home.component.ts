import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';
import { SharedService } from '../shared.service';
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
  filteredRoomData: any;
  formToggleVer: boolean = false;
  token:string|null = localStorage.getItem('jwtToken')
  passKey: any;
  joinButtonVisible: boolean = false;
  PassErrorMessage: String = 'Enter PassKey';

  constructor(private http: HttpClient, private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sendJwt();

    
    
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
      this.filteredRoomData = response;
      this.sharedService.myRooms$.subscribe(showMyRooms => {
        if (showMyRooms) {
          this.filterMyRooms();
        } else {
          this.filteredRoomData = response;
        }
      });
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
  if (passkeyInput == null) {
    this.PassErrorMessage = 'Please Enter Pass Key';
    return;
  }
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
        else{
          
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

sendJwt(): void {
  const ssoEmail = sessionStorage.getItem('email');
  const url = `${environment.url}/user/getToken/${ssoEmail}`;
  
  this.http.get<any>(url).subscribe(
    response => {
      console.log(response);
      localStorage.setItem('jwtToken', response.SsoToken);
      localStorage.setItem('userEmail', response.userEmail);
      localStorage.setItem('userName', response.userName);
      localStorage.setItem('userId', response.userId);
      if(response.Status == "User already exists" ){
        this.getRoomData();
      }

    },
    error => {
      console.error('Error fetching JWT:', error);
    }
  );
}


searchTerm: string = '';
filterRooms(){
  this.filteredRoomData = this.roomData.filter((room: { roomName: string; }) => 
    room.roomName.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
  console.log(this.filteredRoomData)
}
filterMyRooms() {
  const userName = localStorage.getItem('userName');
  this.filteredRoomData = this.roomData.filter((room: { user: { userName: string; }; }) =>
    room.user.userName === userName
  
  );
}



}
