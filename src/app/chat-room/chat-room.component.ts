import { Component, OnInit, OnDestroy } from '@angular/core';
import { SocketService } from './socket.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  isConnected: boolean | undefined;
  groupChatToggleVer: boolean = false;
  username: string | null = localStorage.getItem('userName');
  roomId: string | null = this.route.snapshot.params['roomId'];
  retroTypeData: any;
  commonMessageText: any;
  goodMessageText: any;
  badMessageText: any;
  avgMessageText: any;
  messages: any = [];
  filteredMessages: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  topicTextAreaStates: { [key: string]: boolean } = {};
  selectedMessageIndex: number = -1;
  previousUsername: string = '';
  like: number = 0;

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const room = this.roomId!;
    const username = this.username!;

    // Get room data and messages
    this.getRoomData();
    this.getMessages(room);

    // Initialize socket connection
    this.socketService.initializeSocket(room, username);

    // Subscribe to socket events
    this.subscriptions.push(
      this.socketService.connectionStatus$.subscribe((connected: boolean) => {
        this.isConnected = connected;
      }),
      this.socketService.userJoin$.subscribe((data: any) => {
        console.log("User joined:", data);
        this.userNotificationLogs(data+" joined the room");
      }),
      this.socketService.userExit$.subscribe((data: any) => {
        console.log("User exited:", data);
        this.userNotificationLogs(data+" left the room");
      }),
      this.socketService.receiveMessage$.subscribe((message: any) => {
        this.messages.push(message);
        this.filteredMessages.next(this.messages.filter((msg: any) => msg && msg.room === room));
      })
    );

    // User join method
    const data = {
      userId: localStorage.getItem('userId'),
      roomId: room,
    };
    this.http.post<any>(environment.url + '/userJoinRoom', data).subscribe((response) => {
      console.log(response);
    });
  }

  sendCommonMessage() {
    const data = {
      content: this.commonMessageText,
      room: this.roomId,
      username: this.username,
      contentType: 'Common',
    };
    this.socketService.sendMessage(data);
    this.commonMessageText = '';
  }

  TextAreaDropDown(topicName: string) {
    this.topicTextAreaStates[topicName] = !this.topicTextAreaStates[topicName];
  }

  sendMessage(type: string) {
    const data = {
      content: this.goodMessageText, // Use goodMessageText for simplicity
      room: this.roomId,
      username: this.username,
      contentType: type,
    };
    this.socketService.sendMessage(data);
    this.goodMessageText = '';
  }

  optionsDropDown(index: number) {
    this.selectedMessageIndex = this.selectedMessageIndex === index ? -1 : index;
  }

  deleteMessage(message: any) {
    const room = this.roomId!;
    const url = environment.url + `/message/delete/${message.id}`;
    this.http.delete<any[]>(url).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status === 'success') {
          this.getMessages(room);
        }
      },
      (error) => {
        console.error('Failed to delete message:', error);
      }
    );
  }

  likesCount(message: any) {
    const room = this.roomId!;
    const url = environment.url + `/message/like/${message.id}`;
    this.like = this.like + 1;
    this.http.put<any>(url, this.like).subscribe(
      (response: any) => {
        console.log(response);
        this.getMessages(room);
      },
      (error) => {
        console.error('Failed to like/unlike message:', error);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  groupChatToggle() {
    this.groupChatToggleVer = !this.groupChatToggleVer;
  }

  getRoomData() {
    const url = environment.url + `/get/${this.roomId}`;
    this.http.get<any>(url).subscribe(
      (data) => {
        console.log(data);
        this.retroTypeData = data;

        // Initialize textarea visibility states for each topic
        this.retroTypeData.topics.forEach((topic: any) => {
          this.topicTextAreaStates[topic.topicName] = false;
        });
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getMessages(room: string) {
    const getMessagesUrl = environment.url + `/message/${this.roomId}`;
    this.http.get<any>(getMessagesUrl).subscribe(
      (response) => {
        this.messages = response;
        this.filteredMessages.next(this.messages.filter((msg: any) => msg && msg.room === room));
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  updatePreviousUsername(currentUsername: string) {
    this.previousUsername = currentUsername;
  }

// User logs Notification 
userNotification: boolean = false;
notificationUserName: string = "";

userNotificationLogs(userJoin: string) {
  this.userNotification = true;
  this.notificationUserName = userJoin;
  // Set timeout to reset the notification
  setTimeout(() => {
    this.userNotification = false;
  }, 3000);
}

}
