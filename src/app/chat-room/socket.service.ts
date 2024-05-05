import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;
  connectionStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  receiveMessage$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {}

  initializeSocket(room: string, username: string) {
    const socketUrl = `http://172.20.10.2:8085/?room=${room}&username=${username}`;
    this.socket = new Socket({ url: socketUrl });

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.connectionStatus$.next(true);
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.connectionStatus$.next(false);
    });

    this.socket.on('receive_message', (data: any) => {
      console.log('Received message from server:', data);
      this.receiveMessage$.next(data);
    });
  }

  sendMessage(data: any) {
    console.log('Sending message to server:', data);
    this.socket.emit('send_message', data);
  }
}
