import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class NavBarComponent implements OnInit {
  userEmail: string | null = localStorage.getItem('userEmail');
  user: boolean = false;
  menu: boolean = false;
  showDropdown: any;

  constructor(private sharedService: SharedService, private router: Router) {}

  onMyRoomsClick() {
    this.sharedService.setMyRoomsView(true);
  }

  ngOnInit(): void {
    if (localStorage.getItem('jwtToken')) {
      this.user = true;
    }
  }

  showDropDown() {
    this.menu = !this.menu;
    console.log(this.menu);
  }

  logout() {
    const idToken = sessionStorage.getItem('token'); // Retrieve ID token from local storage
    const logoutUrl = `${environment.idpLogoutUrl}?id_token_hint=${idToken}&post_logout_redirect_uri=${environment.homeUrl}`;

    // Clear local session
    sessionStorage.clear();
    localStorage.clear();
  
    // Redirect to IdP logout URL
    window.location.href = logoutUrl;
  }
}
