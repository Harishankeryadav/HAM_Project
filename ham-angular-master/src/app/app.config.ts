import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimations(),
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 3000, 
        positionClass: 'toast-top-right',
        preventDuplicates: true,
        progressBar: true,
        newestOnTop:true
      })),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
  importProvidersFrom(HttpClientModule)]
};

