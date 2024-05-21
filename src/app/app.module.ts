import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegComponent } from './auth/reg/reg.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RoomFormComponent } from './room-form/room-form.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ChatModule } from './chat-room/chat.module';
import { ProfileComponent } from './user/profile/profile.component';
import { DialogComponent } from './user/dialog/dialog.component';
import { SnackbarComponent } from './user/snackbar/snackbar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { KeycloakService } from './keycloak.service';




@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        RegComponent,
        RoomFormComponent,
        ProfileComponent,
        DialogComponent,
        SnackbarComponent,
        
    ],
    providers: [
        provideAnimationsAsync(),
        KeycloakService
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatInputModule,
        MatSelectModule,
        ChatModule,
        NavBarComponent,
        MatDialogModule,
        MatSnackBarModule,
        RouterModule.forRoot([]) // Ensure to initialize RouterModule.forRoot
        
    ]
})
export class AppModule {
    
 }
