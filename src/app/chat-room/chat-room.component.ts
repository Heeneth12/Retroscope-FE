import { Component, OnInit, OnDestroy, output } from '@angular/core';
import { SocketService } from './socket.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
  chartData: any = this.roomId;


  constructor(private socketService: SocketService , private route:ActivatedRoute ,private http: HttpClient,) {}

  // deleteMessage(id:any){
  //   console.log("hi");
  //   const deleteMessageUrl = `http://localhost:8080/messsage/delete/${id}`;
  //   this.http.delete<any>(deleteMessageUrl).subscribe(
  //     (response)=>{
  //       console.log(response);
  //     },
  //     (error)=>{
  //       console.log(error);
  //     }
  //   )

  //   const getMessagesUrl = `http://localhost:8080/message/${this.roomId}`;
  //   this.http.get<any>(getMessagesUrl).subscribe(
  //   (response) => {
  //     // Assuming the response contains an array of messages
  //     this.messages = response;
  //     // Filter messages for the current room
  //     this.filteredMessages.next(this.messages.filter((msg: any) => msg && msg.room === this.roomId));
  //   },
  //   (error) => {
  //     console.error("Error fetching messages:", error);
  //   }
  // );
  // }

  ngOnInit(): void {
    // this.messages = []; // Initialize messages array here
    const room = this.route.snapshot.params['roomId'];
    const username = localStorage.getItem('userName')

    //user join methode
    const data = {
      "userId": localStorage.getItem('userId'),
      "roomId": room
    };
    console.log(data);
    
    const url = "http://localhost:8080/userJoinRoom";
    this.http.post<any>(url, data).subscribe(
      (response) => {
        console.log(response);
      }
    );

    //Getmessages -->
    const geturl = `http://localhost:8080/message/${this.roomId}`;
    this.http.get<any>(geturl).subscribe(
      (Response)=>{
        console.log(Response)
      }
    )
    


  
    // this.messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    
    // if (this.messages) {
    //   this.filteredMessages.next(this.messages.filter((message: any) => message && message.room === room));
    // }
    // Get messages from the server
  const getMessagesUrl = `http://localhost:8080/message/${this.roomId}`;
  this.http.get<any>(getMessagesUrl).subscribe(
    (response) => {
      // Assuming the response contains an array of messages
      this.messages = response;
      // Filter messages for the current room
      this.filteredMessages.next(this.messages.filter((msg: any) => msg && msg.room === room));
    },
    (error) => {
      console.error("Error fetching messages:", error);
    }
  );
    

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
      // localStorage.setItem('chatMessages', JSON.stringify(this.messages));
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
