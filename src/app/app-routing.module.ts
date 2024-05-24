import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { LoginComponent } from './auth/login/login.component';
import { RegComponent } from './auth/reg/reg.component';
import { RoomFormComponent } from './room-form/room-form.component';
import { ProfileComponent } from './user/profile/profile.component';
 
export const routes: Routes = [
  {path:'' , component :HomeComponent},
  {path :'reg' , component : RegComponent},
  {path :'roomform' , component : RoomFormComponent},
  {path :'profile' , component : ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
