import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone : true,
  imports : [CommonModule]
})
export class NavBarComponent {

  userEmail:string|null = localStorage.getItem('userEmail')
  user:boolean  = false;
  menu:boolean = false;
  showDropdown: any;

  constructor(private sharedService: SharedService) {}

  onMyRoomsClick() {
    this.sharedService.setMyRoomsView(true);
  }
  ngOnInit(): void {
    if (localStorage.getItem('jwtToken')) {
    this.user = true;
    // console.log(this.user)
    }

   


  }


  showDropDown(){
    this.menu = !this.menu
    console.log(this.menu)
  }

  logout() {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
  }

}
