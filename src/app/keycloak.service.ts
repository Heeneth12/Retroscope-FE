import { Injectable } from "@angular/core";
import Keycloak, { KeycloakInstance } from "keycloak-js";
import { environment } from "../environment/environment";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private keycloakAuth: KeycloakInstance;

  constructor() {
    this.keycloakAuth = new Keycloak({
      url: environment.keycloakRootUrl,
      realm: 'master',
      clientId: 'ahcl',
    });
  }

  async init(): Promise<boolean> {
    try {
      const authenticated = await this.keycloakAuth.init({ onLoad: 'login-required', checkLoginIframe: false, flow: 'standard' });

      if (authenticated) {
        sessionStorage.setItem('token', JSON.stringify(this.keycloakAuth.token));
       

        // // Example call to check if token is added, replace with actual URL
        // const url = "http://example.com/check-token"; // Replace with actual URL
        // this.http.get<any>(url).subscribe(
        //   response => console.log(response),
        //   error => console.error('Error in HTTP request:', error)
        // );

        const username = this.getUsername();
        const fullName = this.getFullName();
        sessionStorage.setItem('email',username );
        
        console.log(`Authenticated as: ${username}`);
        console.log(`Full name: ${fullName}`);

        return true; // Authentication successful
      } else {
        console.error('User not authenticated');
        return false; // Authentication failed
      }
    } catch (error) {
      console.error('Keycloak authentication failed:', error);
      return false; // Authentication failed
    }
  }

  // Uncomment and implement these methods if needed
  getUsername(): string {
    return this.keycloakAuth.tokenParsed?.["preferred_username"] || '';
  }

  getFullName(): string {
    return this.keycloakAuth.tokenParsed?.["name"] || '';
  }

  getToken(): string {
    return this.keycloakAuth.token || '';
  }

  logout(): void {
    this.keycloakAuth.logout();
  }
}
