import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketService } from './socket.service';
import { ChatRoomComponent } from './chat-room.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocketIoModule.forRoot({ url: 'ws://192.168.0.234:8085?room=a&username=nani' })
  ],
  providers: [ SocketService],
})
export class ChatModule { }
