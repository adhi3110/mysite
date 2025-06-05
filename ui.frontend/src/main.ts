import {bootstrapApplication} from '@angular/platform-browser';
import {environment} from './app/environments/environment';
import {enableProdMode} from '@angular/core'
import {AppComponent} from './app/app.component';
import {appComponentConfig} from './app/app.component.config';

if (environment.production) {
  enableProdMode();
} else {
  // In development mode, redirect from "/" to app root
  if (location.pathname === '/' && environment.appRoot) {
    location.href = environment.appRoot;
  }
}

const initialStateScriptTag = document.getElementById('__AEM_STATE__');
if(!!initialStateScriptTag) {
  try {
    const initialState = JSON.parse(initialStateScriptTag.innerHTML);
    // @ts-ignore
    window.initialModel = initialState.rootModel;
    initialStateScriptTag.remove();
  }catch(err){
    console.warn('failed to hydrate app', err);
  }
}

bootstrapApplication(AppComponent, appComponentConfig)
  .catch((err) => console.error(err));
