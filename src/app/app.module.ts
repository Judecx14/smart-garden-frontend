import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

// Royters
import {APP_ROUTING} from './routes/router';

import {AppComponent} from './app.component';
import { ProfileComponent } from './components/Master/profile/profile.component';
import { FlowerpotDetailsComponent } from './components/flowerpot-details/flowerpot-details.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    FlowerpotDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
