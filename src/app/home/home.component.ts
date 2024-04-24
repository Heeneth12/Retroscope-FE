import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  data:any = 
    {
      roomID: 2353,
      roomName : "Gaming Hub",
      topic : "discussing about online gaming",
      startTime: "6:30",
      endTime : "7:30"
    }
  //nikhil

}
