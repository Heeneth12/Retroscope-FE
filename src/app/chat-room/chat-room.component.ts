import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './socket.service';
import { BehaviorSubject, Subscription } from 'rxjs';
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
  isHovered: boolean = true;
  username :string |null = localStorage.getItem('userName')
  roomId : string |null = this.route.snapshot.params['roomId'];

  commonMessageText: any;
  goodMessageText: any;
  badMessageText: any;
  avgMessageText: any;
  messages: any;
  filteredMessages: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  
  //dropdown ver
  goodtestAreaVer: boolean = false;
  badtestAreaVer: boolean = false;
  avgtestAreaVer: boolean = false;

  constructor(private socketService: SocketService , private route:ActivatedRoute) {}

  ngOnInit(): void {
    // this.messages = []; // Initialize messages array here
    const room = this.route.snapshot.params['roomId'];
    const username = localStorage.getItem('userName')

  
    this.messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    
    if (this.messages) {
      this.filteredMessages.next(this.messages.filter((message: any) => message && message.room === room));
    }
    

    this.socketService.initializeSocket(room, username!);
    this.socketService.connectionStatus$.subscribe((connected: boolean) => {
      this.isConnected = connected;
      if (connected) {
        // Connection established, you can perform actions here if needed
      } else {
        // Connection lost, handle accordingly
      }
    });
  
    this.socketService.receiveMessage$.subscribe((message: any) => {
      // Handle received message
      this.messages.push(message);
      // Save messages to localStorage
      localStorage.setItem('chatMessages', JSON.stringify(this.messages));
      this.filteredMessages.next(this.messages.filter((msg: any) =>msg && msg.room === room));
    });
  }


  //
  sendCommonMessage() {
    const data = {
      content: this.commonMessageText,
      room: this.roomId,
      username: this.username, // Change this to dynamically get the username
      contentType:"Common"
    };
    this.socketService.sendMessage(data);
    this.commonMessageText = ''; // Clear the input field after sending message
  }
  sendGoodMessage() {
    const data = {
      content: this.goodMessageText,
      room: this.roomId,
      username: this.username, // Change this to dynamically get the username
      contentType:"Good"
    };
    this.socketService.sendMessage(data);
    this.goodMessageText = ''; // Clear the input field after sending message
  }
  sendBadMessage() {
    const data = {
      content: this.badMessageText,
      room: this.roomId,
      username: this.username, // Change this to dynamically get the username
      contentType:"Bad"
    };
    this.socketService.sendMessage(data);
    this.badMessageText = ''; // Clear the input field after sending message
  }
  sendAvgMessage() {
    const data = {
      content: this.avgMessageText,
      room: this.roomId,
      username: this.username, // Change this to dynamically get the username
      contentType:"Avg"
    };
    this.socketService.sendMessage(data);
    this.avgMessageText = ''; // Clear the input field after sending message
  }


  ngOnDestroy(): void {
    // Unsubscribe from subscriptions to avoid memory leaks
    if (this.connectionStatusSubscription) {
      this.connectionStatusSubscription.unsubscribe();
    }
  }

  //toggle functions
  groupChatToggle() {
    this.groupChatToggleVer = !this.groupChatToggleVer;
  }
  goodTextAreaDropDown() {
    this.goodtestAreaVer = !this.goodtestAreaVer;
  }
  badTextAreaDropDown() {
    this.badtestAreaVer = !this.badtestAreaVer;
  }
  avgTextAreaDropDown() {
    this.avgtestAreaVer = !this.avgtestAreaVer;
  }
}
