import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  @Input() data: string | null = null;

  constructor(private http: HttpClient) {} // Inject Router module


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
