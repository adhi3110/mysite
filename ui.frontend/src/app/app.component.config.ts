import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import {provideRouter, RouteReuseStrategy} from '@angular/router';

import { routes } from './app.routes';
import {AemPageDataResolver} from '@editable-components';
import {AemPageRouteReuseStrategy} from '@editable-components';
import {APP_BASE_HREF} from '@angular/common';
import {ModelManagerService} from './components/model-manager.service';

export const appComponentConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    ModelManagerService,
    AemPageDataResolver,
    {
      provide: RouteReuseStrategy,
      useClass: AemPageRouteReuseStrategy
    },
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ]
};
