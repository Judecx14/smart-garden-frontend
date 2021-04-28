import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ChartsModule} from 'ng2-charts';
import {CookieService} from 'ngx-cookie-service';

// Royters
import {APP_ROUTING} from './routes/router';
import {AppComponent} from './app.component';
import {ProfileComponent} from './components/Master/profile/profile.component';
import {FlowerpotDetailsComponent} from './components/flowerpot-details/flowerpot-details.component';
import {SensorDetailsComponent} from './components/sensor-details/sensor-details.component';
import {BarChartComponent} from './components/Master/bar-chart/bar-chart.component';
import {DoughnutChartComponent} from './components/Master/doughnut-chart/doughnut-chart.component';
import {RadarChartComponent} from './components/Master/radar-chart/radar-chart.component';
import {PieChartComponent} from './components/Master/pie-chart/pie-chart.component';
import {NavbarComponent} from './components/Master/navbar/navbar.component';
import {LoginComponent} from './components/Master/login/login.component';
import {RegisterComponent} from './components/Master/register/register.component';
import {FooterComponent} from './components/Master/footer/footer.component';
import {Wildcard404Component} from './components/Master/wildcard404/wildcard404.component';
import {DatepickerModule} from 'ng2-datepicker';
import {IndexComponent} from './components/Master/index/index.component';
import {GardenComponent} from './components/garden/garden.component';
import {QrCodeComponent} from './components/qr-code/qr-code.component';
import {PlantsComponent} from './components/plants/plants.component';
import {FlowerpotGraphicsComponent} from './components/flowerpot-graphics/flowerpot-graphics.component';
import {TokenInterceptor} from './interceptors/Token/token.interceptor';
import {AuthService} from './services/auth/auth.service';
import {AuthGuardService} from './services/guard/auth-guard.service';
import {SensorsService} from './services/sensors/sensors.service';
import {ActivityComponent} from './components/details/activity/activity.component';
import {ReadingComponent} from "./components/details/reading/reading.component";
import {GraphicsComponent} from "./components/details/graphics/graphics.component";
import {GraphComponent} from "./components/details/graph/graph.component";
import { ActionsComponent } from './components/details/actions/actions.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    FlowerpotDetailsComponent,
    SensorDetailsComponent,
    BarChartComponent,
    DoughnutChartComponent,
    RadarChartComponent,
    PieChartComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    Wildcard404Component,
    IndexComponent,
    GardenComponent,
    QrCodeComponent,
    PlantsComponent,
    FlowerpotGraphicsComponent,
    ActivityComponent,
    ReadingComponent,
    GraphicsComponent,
    GraphComponent,
    ActionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule,
    DatepickerModule
  ],
  providers: [
    SensorsService,
    CookieService,
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
