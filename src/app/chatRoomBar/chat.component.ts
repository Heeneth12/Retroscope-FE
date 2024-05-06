import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent  {
  @Input() data: string | null = null;

  dropdownOpen:boolean  =false;



  url :string = "";
  constructor(private http: HttpClient , private router : Router) {
    console.log(this.router.url);
    this.url = this.router.url
  } // Inject Router module


  toggleDropdown(){

    this.dropdownOpen = !this.dropdownOpen;
    console.log(this.dropdownOpen)

  }





  
  dataToggle:boolean =false;

  messageTypeCount:any= {};
  reportData() {
    const url = `http://localhost:8080/message/analysisMessage/${this.data}`;
    this.http.get<any>(url).subscribe((Response) => {
      console.log(Response);
      this.messageTypeCount = Response
      this.dataToggle = !this.dataToggle
      console.log(this.dataToggle)
      
    });
  }

}
