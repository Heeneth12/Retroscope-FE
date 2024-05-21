import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { KeycloakService } from './app/keycloak.service';

const keycloakService = new KeycloakService();

keycloakService.init()
  .then((authenticated: boolean) => {
    if (authenticated) {
      platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.error(err));
    } else {
      console.error('Authentication failed. Redirecting to login page.');
      window.location.href = 'http://localhost:4200/login';
    }
  })
  .catch(err => console.error('Error initializing Keycloak', err));
