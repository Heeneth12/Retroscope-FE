import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  user:boolean  = false;
  menu:boolean = false;
showDropdown: any;

  ngOnInit(): void {
    if (localStorage.getItem('jwtToken')) {
    this.user = true;
    console.log(this.user)
    }
  }


  showDropDown(){

    this.menu = !this.menu
    console.log(this.menu)
  }

}
