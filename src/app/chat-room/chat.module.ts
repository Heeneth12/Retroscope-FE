import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule } from 'ngx-socket-io'; // Import only what you need
import { SocketService } from './socket.service';
import { ChatRoomComponent } from './chat-room.component';
import { ChatComponent } from '../chat/chat.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

const clientVersion = 'v2.0'; // Define the client version

const config = {
  url: 'ws://10.10.10.67:8085?room=a&username=nani',
  options: {
    transports: ['websocket'],
    upgrade: true,
    path: '/socket.io',
    reconnectionAttempts: Infinity,
    reconnectionDelay: 5000,
    extraHeaders: {
      'Connection': 'keep-alive',
      'Upgrade': 'websocket',
      'Client-Version': clientVersion // Add the client version as a custom header
    }
  }
};

@NgModule({
  declarations: [
    ChatRoomComponent,
    ChatComponent,
  ],
  providers: [SocketService],
  imports: [
    CommonModule,
    FormsModule,
    SocketIoModule.forRoot(config), // Pass the configuration to forRoot
    NavBarComponent
  ]
})
export class ChatModule { }
