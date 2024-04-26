import { HttpClient } from '@angular/common/http';
import { ArrayType } from '@angular/compiler';
import { Component } from '@angular/core';
import { FormGroup , FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.css'
})
export class RoomFormComponent {
  roomForm: FormGroup;
  // topics:any = new FormControl('');

  topicList: string[] = ['What went well?', 'What did not go well?', 'Pros', 'Cons', 'Things Need To Be Improve', 'What did we learn?', 'What’s our weakest link as a team?', 'What ideas do you have?', 'How should we take action?'];
  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
     this.roomForm = this.formBuilder.group({
      roomTitle: ['', [Validators.required, Validators.email]],
      roomDescription: ['', [Validators.required]],
      roomStartDate : [''],
      roomEndDate : [''],
      // roomtopics : ArrayType[this.topics.value],
      // roomtopics: this.formBuilder.array(this.topics.value) 
      roomTopics : [[]],
    });
  }

  onsubmit(){
    
    console.log(this.roomForm.value)
    
    if (this.roomForm.invalid) {
      return;
    }
    

    this.http.post<any>('http://localhost:8085/user/add', this.roomForm.value)
      .subscribe(
        response => {
          if(response.Status === "OK"){
            console.log('successful');
            // localStorage.setItem('token', response.token);
            // console.log(response.token)
          // Redirect to the desired page, e.g., home page
          this.router.navigate(['/home']);
          } else{
            console.error('failed:', response.error);
          }
          
        },
        error => {
          // Handle login error
          console.error('HTTP error:', error);
          // Optionally, display an error message to the user
        }
      );
  }
}
