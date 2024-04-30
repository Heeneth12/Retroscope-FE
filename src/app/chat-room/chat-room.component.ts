import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit ,OnDestroy {

  connectionStatusSubscription: Subscription | undefined;
  isConnected: boolean | undefined;
  groupChatToggleVer: any;
  receivedMessageSubscription: any;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.connectionStatusSubscription = this.socketService.connectionStatus$.subscribe((connected: boolean) => {
      this.isConnected = connected;
      if (connected) {
        // Connection established, you can perform actions here if needed
      } else {
        // Connection lost, handle accordingly
      }
    });    

    
  }

  sendMessage() {
    const data = {
      "content": "vscode-data",
      "room": "a",
      "username": "vscode"
  }
   this.socketService.sendMessage(data)
  }

  ngOnDestroy(): void {
    // Unsubscribe from subscriptions to avoid memory leaks
    if (this.connectionStatusSubscription) {
      this.connectionStatusSubscription.unsubscribe();
    }
    if (this.receivedMessageSubscription) {
      this.receivedMessageSubscription.unsubscribe();
    }
  }
  
}
