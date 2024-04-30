import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketIoModule } from 'ngx-socket-io'; // Import only what you need
import { SocketService } from './socket.service';
import { ChatRoomComponent } from './chat-room.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@NgModule({
    declarations: [
        ChatRoomComponent,
    ],
    providers: [SocketService],
    imports: [
        CommonModule,
        FormsModule,
        SocketIoModule, // No need to provide configuration here
        RouterModule.forChild([
            { path: 'chat', component: ChatRoomComponent }
        ]),
        NavBarComponent
    ]
})
export class ChatModule { }
