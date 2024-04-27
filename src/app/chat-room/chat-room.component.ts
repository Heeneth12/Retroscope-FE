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
    // Subscribe to connection and disconnection events
    this.socketService.onConnect().subscribe(() => {
      console.log('Connected to Socket.IO server');
    });

    this.socketService.onDisconnect().subscribe(() => {
      console.log('Disconnected from Socket.IO server');
    });

    // Connect to the Socket.IO server
    this.socketService.connect();
  }

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
