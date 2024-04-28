import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io'; // Import SocketIoConfig
import { SocketService } from './socket.service';
import { ChatRoomComponent } from './chat-room.component';
import { ChatComponent } from '../chat/chat.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from '../nav-bar/nav-bar.component';


// Define configuration options for Socket.IO
const config: SocketIoConfig = {
  url: 'ws://192.168.1.5:8085?room=a&username=nani',
  options: {
    transports: ['websocket'], // Specify WebSocket transport only
    upgrade: false, // Set upgrade to false for Socket.IO v2
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
        SocketIoModule.forRoot(config) // Pass the configuration to forRoot
        ,
        NavBarComponent
    ]
})
export class ChatModule { }