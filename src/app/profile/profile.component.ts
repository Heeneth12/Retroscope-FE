import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  selectedTab: number = 0;

  selectTab(tab: number) {
    this.selectedTab = tab;
    console.log(this.selectTab)
  }
}
