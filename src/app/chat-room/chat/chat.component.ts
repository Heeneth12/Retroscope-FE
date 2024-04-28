import { Component } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
sendMessage() {
throw new Error('Method not implemented.');
}
messages = [
  { content: 'Hello!', sender: 'user' },
  { content: 'Hi there!', sender: 'sender' },
  { content: 'How are you?', sender: 'user' },
  { content: 'I am fine, thanks!', sender: 'sender' },
  { content: 'Hello!', sender: 'user' },
  { content: 'Hi there!', sender: 'sender' },
  { content: 'How are you?', sender: 'user' },
  { content: 'I am fine, thanks!', sender: 'sender' },
];
newMessageText: any;

}
