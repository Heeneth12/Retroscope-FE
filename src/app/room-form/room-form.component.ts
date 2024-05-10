import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'; // Import FormControl
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Topic {
  topicId: number;
  topicName: string;
}

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css'],
})
export class RoomFormComponent implements OnInit {
  roomForm: FormGroup;
  topicList: Topic[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.roomForm = this.formBuilder.group({
      roomName: ['', [Validators.required]],
      roomDescription: ['', [Validators.required]],
      user: [localStorage.getItem('userId')],
      restrictedRoom: [false],
      restrictedRoomPassKey: '',
      roomTopics: [[]] // Initialize roomTopics as FormControl with null value
    });
  }

  ngOnInit(): void {
    this.fetchTopicList();
  }

  fetchTopicList(): void {
    const url = "http://localhost:8080/topic/getAllTopic";
    this.http.get<Topic[]>(url).subscribe((response) => {
      this.topicList = response;
    });
  }

  compareTopics(topic1: Topic, topic2: Topic): boolean {
    return topic1 && topic2 ? topic1.topicId === topic2.topicId : topic1 === topic2;
  }

  onSubmit(): void {
    console.log(this.roomForm.value);
    this.http.post<any>('http://localhost:8080/create', this.roomForm.value)
      .subscribe(
        (response) => {
          if (response.status === 'successfully created') {
            console.log('successful');
            location.reload();
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
