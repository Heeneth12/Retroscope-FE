import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent {
  messages: any[] = []; // Array to store chat messages

  constructor() { }

  sendMessage(messageText: string) {
    // Add the message to the array
    this.messages.push({ text: messageText, sender: 'user' });
    // Clear the input field
    // You can also send the message to a server here if you're implementing real-time chat
  }
}
