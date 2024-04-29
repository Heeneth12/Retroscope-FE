import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  connected: boolean = false;

  constructor(private socket: Socket) { }

  // Method to establish connection with the Socket.IO server
  connect() {
    console.log('Attempting to connect to the Socket.IO server...');
    this.socket.connect();

    // Update connection status
    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.connected = true; // Update connection status flag
    });

    // Log current connection status
    console.log('Connection status:', this.connected);
  }

  // Method to send a message to the server
  sendMessage(data: any) {
    console.log('Sending message to server:', data);
    this.socket.emit('send_message', data);
  }

  // Method to listen for incoming messages from the server
  onReceiveMessage() {
    return this.socket.fromEvent('receive_message').pipe(map(data =>console.log(data)))
  }

  // Method to handle user connection event
  onConnect() {
    return this.socket.fromEvent('connect');
  }

  // Method to handle user disconnection event
  onDisconnect() {
    return this.socket.fromEvent('disconnect');
  }

  // Method to handle user connection to a room event
  onRoomJoin() {
    return this.socket.fromEvent('room_join');
  }

  // Method to handle user disconnection from a room event
  onRoomLeave() {
    return this.socket.fromEvent('room_leave');
  }

  // Method to handle custom events sent by the server
  onCustomEvent(eventName: string) {
    return this.socket.fromEvent(eventName);
  }
}