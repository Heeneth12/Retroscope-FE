import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup , FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrl: './room-form.component.css'
})
export class RoomFormComponent {
  roomForm: FormGroup<{ roomTitle: FormControl<string | null>; roomDescription: FormControl<string | null>; roomStartDate: FormControl<string | null>; roomEndDate: FormControl<string | null>; }>;
  toppings: FormControl<any> | undefined;

  
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
      
    });
  }

  onsubmit(){

  }
}
