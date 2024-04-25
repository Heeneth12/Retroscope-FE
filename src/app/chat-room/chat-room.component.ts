import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})

export class ChatRoomComponent {
  messages: { text: string, sender: string }[] = []; // Array to store chat messages
  messageInput: string = ''; // Declare messageInput as string type

  constructor() { }

  sendMessage() {
    if (this.messageInput.trim() !== '') { // Check if messageInput is not empty or whitespace
      this.messages.push({ text: this.messageInput, sender: 'user' });
      this.messageInput = ''; // Clear the input field
    }
  }
}
