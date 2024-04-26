import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
  providers: [SocketService]
})
export class ChatRoomComponent implements OnInit {
  message: string = '';
  messages: string[] = [];
  customEventData: any;

  constructor(private socketService: SocketService) { }
  ngOnInit(): void {
    console.log("connect")
  }

  // ngOnInit(): void {
  //   // Connect to the Socket.IO server
  //   console.log('Attempting to connect to the Socket.IO server...');
  //   this.socketService.onConnect();
  //   console.log('Connection status:', this.socketService.onConnect());

  //   // // Subscribe to incoming messages
  //   // this.socketService.onReceiveMessage().subscribe((message: unknown) => {
  //   //   console.log('Received message from server:', message);
  //   //   this.messages.push(message as string);
  //   // });
  // }

  sendMessage() {
    // Send message to the server
    if (this.message.trim() !== '') {
      const data = {
        room: 'a',
        username: 'nani',
        content: this.message
      };
      console.log('Sending message to server:', data);
      this.socketService.sendMessage(data);
      this.message = ''; // Clear the input field after sending
    }
  }
}
