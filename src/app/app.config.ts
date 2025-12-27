import { ApplicationConfig } from '@angular/core';
import {provideRouter, withRouterConfig} from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { appHttpInterceptor } from './interceptors/app-http.interceptor';
import { errorInterceptor } from './interceptors/error.interceptor';
import {jwtInterceptor} from './auth/jwt-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes , withRouterConfig({
      onSameUrlNavigation: 'reload'
    })),
    provideHttpClient(
      withInterceptors([appHttpInterceptor ,errorInterceptor, jwtInterceptor])
    )
  ]
};
