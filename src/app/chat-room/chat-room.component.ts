import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './socket.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  connectionStatusSubscription: Subscription | undefined;
  isConnected: boolean | undefined;
  groupChatToggleVer: boolean = false;
  receivedMessageSubscription: any;
  testAreaVer: boolean = false;
  isHovered: boolean = true;
  // roomId: string | undefined;
  // roomName: string | undefined;

  constructor(private socketService: SocketService , private route:ActivatedRoute) {}

  ngOnInit(): void {
    const room = this.route.snapshot.params['roomId'];
    const username = this.route.snapshot.params['roomName'];
    // console.log(this.roomId)
    // console.log(this.roomName)
    // const room = this.route.snapshot.queryParamMap.get('room');
    // const username = this.route.snapshot.queryParamMap.get('username');
    this.socketService.initializeSocket(room!, username!);

      this.socketService.connectionStatus$.subscribe((connected: boolean) => {
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
      content: 'vscode-data',
      room: 'a',
      username: 'vscode',
    };
    this.socketService.sendMessage(data);
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

  groupChatToggle() {
    this.groupChatToggleVer = !this.groupChatToggleVer;
  }
  textAreaDropDown() {
    this.testAreaVer = !this.testAreaVer;
  }
}
