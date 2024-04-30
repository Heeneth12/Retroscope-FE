import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  connectionStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  receiveMessage$: BehaviorSubject<any> = new BehaviorSubject<any>(null); // Initialize receiveMessage$

  constructor() {
    const socketUrl = 'http://10.10.10.26:9090';
    this.socket = new Socket({ url: socketUrl });

    // Update connection status based on socket events
    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.connectionStatus$.next(true); // Update connection status to true
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.connectionStatus$.next(false); // Update connection status to false
    });

    this.socket.on('receive_message', (data: any) => {
      console.log('Received message from server:', data);
      // Emit received message to subscribers
      this.receiveMessage$.next(data);
    });
    
  }

  // Method to send a message to the server
  sendMessage(data: any) {
    console.log('Sending message to server:', data);
    this.socket.emit('send_message', data);
  }

  // Method to join a room
  joinRoom(username: string, roomID: string) {
    const data = username + "," + roomID;
    console.log('Joining room:', data);
    this.socket.emit('joinRoom', data);
  }
}
