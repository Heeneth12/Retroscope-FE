import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './socket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit ,OnDestroy {
  message:string = "vs code test"

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

    this.socketService.joinRoom("vscode" , "vscode");
    // Subscribe to received messages
    this.receivedMessageSubscription = this.socketService.receiveMessage$.subscribe((message: any) => {
      console.log('Received message:', message);
      // Handle received message here
    });
    
  }

  sendMessage() {
   this.socketService.sendMessage(this.message)
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
