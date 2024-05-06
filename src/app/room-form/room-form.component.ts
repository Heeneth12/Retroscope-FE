import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css'],
})
export class RoomFormComponent {
  roomForm: FormGroup;
  topicList: string[] = [
    'What went well?',
    'What did not go well?',
    'Pros',
    'Cons',
    'Things Need To Be Improve',
    'What did we learn?',
    'What’s our weakest link as a team?',
    'What ideas do you have?',
    'How should we take action?',
  ];
  

  topicListData(){
    const url = "http://localhost:8080/topic/getAllTopic";
    this.http.get<any>(url).subscribe(Response =>{
      console.log(Response)
    })

  }

  ngOnInit(): void {
    
  }
  

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.roomForm = this.formBuilder.group({
      roomName: ['', [Validators.required, Validators.email]],
      roomCreator :localStorage.getItem('userName'),
      roomDescription: ['', [Validators.required]],
      startDate: [], 
      endDate: [], 
      roomTopics: [[]],
    });
  }

  onsubmit() {
    console.log(this.roomForm.value);
    this.http
      .post<any>('http://localhost:8080/add', this.roomForm.value)
      .subscribe(
        (response) => {
          if (response.status === 'successfully crested room') {
            console.log('successful');
            location.reload()
          } else {
            console.error('failed:', response.error);
          }
        },
        (error) => {
          console.error('HTTP error:', error);
        }
      );
  }
}
