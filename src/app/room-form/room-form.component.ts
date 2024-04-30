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

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.roomForm = this.formBuilder.group({
      roomName: ['', [Validators.required, Validators.email]],
      roomCreator :"heeneth",
      roomDescription: ['', [Validators.required]],
      roomStartDate: [null], // Set default value to null
      roomEndDate: [null], // Set default value to null
      roomTopics: [[]],
    });
  }

  onsubmit() {
    console.log(this.roomForm.value);

    // // Handle null values here if needed
    // const requestData = {
    //   ...this.roomForm.value,
    //   roomStartDate: this.roomForm.value.roomStartDate || '', // Handle null value
    //   roomEndDate: this.roomForm.value.roomEndDate || '', // Handle null value
    // };

    this.http
      .post<any>('http://localhost:8080/add', this.roomForm.value)
      .subscribe(
        (response) => {
          if (response.Status === 'OK') {
            console.log('successful');
            this.router.navigate(['/home']);
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
