import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './socket.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  connectionStatusSubscription: Subscription | undefined;
  isConnected: boolean | undefined;
  groupChatToggleVer: boolean = false;
  receivedMessageSubscription: any;
  testAreaVer: boolean = false;
  isHovered: boolean = true;
  username :string |null = localStorage.getItem('userName')
  roomId : string |null = this.route.snapshot.params['roomId'];

  newMessageText: any;
  messages: any;

  constructor(private socketService: SocketService , private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.messages = []; // Initialize messages array here
  
    const room = this.route.snapshot.params['roomId'];
    // const username = this.route.snapshot.params['roomName'];
    const username = localStorage.getItem('userName')

    this.socketService.initializeSocket(room, username!);
    this.socketService.connectionStatus$.subscribe((connected: boolean) => {
      this.isConnected = connected;
      if (connected) {
        // Connection established, you can perform actions here if needed
      } else {
        // Connection lost, handle accordingly
      }
    });
  
    this.socketService.receiveMessage$.subscribe((message: any) => {
      // Handle received message
      this.messages.push(message);
    });
  }
  //
  sendMessage() {
    const data = {
      content: this.newMessageText,
      room: this.roomId,
      username: this.username, // Change this to dynamically get the username
    };
    this.socketService.sendMessage(data);
    this.newMessageText = ''; // Clear the input field after sending message
  }


  ngOnDestroy(): void {
    // Unsubscribe from subscriptions to avoid memory leaks
    if (this.connectionStatusSubscription) {
      this.connectionStatusSubscription.unsubscribe();
    }
  }

  //toggle functions
  groupChatToggle() {
    this.groupChatToggleVer = !this.groupChatToggleVer;
  }
  textAreaDropDown() {
    this.testAreaVer = !this.testAreaVer;
  }
}
