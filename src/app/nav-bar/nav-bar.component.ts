import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone : true,
  imports : [CommonModule]
})
export class NavBarComponent {

  user:boolean  = false;
  menu:boolean = false;
showDropdown: any;

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
  }

}
