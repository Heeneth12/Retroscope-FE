import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { KeycloakService } from './app/keycloak.service';
import { environment } from './environment/environment';

const keycloakService = new KeycloakService();

keycloakService.init()
  .then((authenticated: boolean) => {
    if (authenticated) {
      platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.error(err));
    } else {
      console.error('Authentication failed. Redirecting to login page.');
      window.location.href = environment.loginUrl;
    }
  })
  .catch(err => console.error('Error initializing Keycloak', err));
