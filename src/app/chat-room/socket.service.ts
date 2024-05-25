import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket!: Socket;
  connectionStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  receiveMessage$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  userJoin$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  userExit$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() {}

  initializeSocket(room: string, username: string) {
    if (this.socket && this.socket.ioSocket.connected) {
      console.log('Socket already initialized and connected');
      return;
    }

    const socketUrl = `${environment.socketUrl}/?room=${room}&username=${username}`;
    const config: SocketIoConfig = {
      url: socketUrl,
      options: {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        timeout: 20000,
        transports: ['websocket']
      }
    };

    this.socket = new Socket(config);

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.connectionStatus$.next(true);
    });

    this.socket.on('disconnect', (reason: string) => {
      console.log('Socket disconnected', reason);
      this.connectionStatus$.next(false);
    });

    this.socket.on('user_join', (data: any) => {
      console.log('User joined', data);
      this.userJoin$.next(data);
    });

    this.socket.on('user_exit', (data: any) => {
      console.log('User exited', data);
      this.userExit$.next(data);
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
