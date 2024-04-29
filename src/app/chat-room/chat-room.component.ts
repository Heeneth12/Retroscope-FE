import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
  providers: [SocketService]
})

export class ChatRoomComponent implements OnInit{

  groupChatToggleVer:boolean = false;
  message: string = '';
  messages: string[] = [];
  customEventData: any;

 
  constructor(private socketService: SocketService) { }


  ngOnInit(): void {
    // Connect to the Socket.IO server
    this.socketService.connect();
    this.socketService.onReceiveMessage();
  }

  sendMessage() {
    // Send message to the server
    if (this.message.trim() !== '') {
      const data = {
        room: 'a',
        username: 'nani',
        content: "angular test"
      };
      console.log('Sending message to server:', data);
      this.socketService.sendMessage(data);
      this.message = ''; // Clear the input field after sending
    }
  }

  groupChatToggle() {
    this.groupChatToggleVer =  !this.groupChatToggleVer
    }
}
