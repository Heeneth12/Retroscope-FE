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
  connectionStatusSubscription: Subscription | undefined;
  isConnected: boolean | undefined;
  groupChatToggleVer: boolean = false;
  receivedMessageSubscription: any;
  isHovered: boolean = true;
  username: string | null = localStorage.getItem('userName');
  roomId: string | null = this.route.snapshot.params['roomId'];
  retroTypeData: any;
  commonMessageText: any;
  goodMessageText: any;
  badMessageText: any;
  avgMessageText: any;
  messages: any;
  filteredMessages: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  topicTextAreaStates: { [key: string]: boolean } = {};
  previousUsername: string = ''; 

  constructor(
    private socketService: SocketService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const room = this.route.snapshot.params['roomId'];
    const username = localStorage.getItem('userName');

    // Get room data
    this.getRoomData();

    // User join method
    const data = {
      userId: localStorage.getItem('userId'),
      roomId: room,
    };
    console.log(data);

    const url = environment.url + '/userJoinRoom';
    this.http.post<any>(url, data).subscribe((response) => {
      console.log(response);
    });

    // Get messages
    this.getMessages(room);

    this.socketService.initializeSocket(room, username!);
    this.socketService.connectionStatus$.subscribe((connected: boolean) => {
      this.isConnected = connected;
    });

    this.socketService.receiveMessage$.subscribe((message: any) => {
      this.messages.push(message);
      this.filteredMessages.next(this.messages.filter((msg: any) => msg && msg.room === room));
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

  selectedMessageIndex: number = -1;

  optionsDropDown(index: number) {
    this.selectedMessageIndex = this.selectedMessageIndex === index ? -1 : index;
  }

  deleteMessage(message: any) {
    const room = this.route.snapshot.params['roomId'];
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

  ngOnDestroy(): void {
    if (this.connectionStatusSubscription) {
      this.connectionStatusSubscription.unsubscribe();
    }
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

    // Method to update previousUsername
    updatePreviousUsername(currentUsername: string) {
      this.previousUsername = currentUsername;
    }
}
