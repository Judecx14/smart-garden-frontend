import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from '../components/Master/profile/profile.component';
import {FlowerpotDetailsComponent} from '../components/flowerpot-details/flowerpot-details.component';
import {SensorDetailsComponent} from '../components/sensor-details/sensor-details.component';
import {BarChartComponent} from '../components/Master/bar-chart/bar-chart.component';
import {DoughnutChartComponent} from '../components/Master/doughnut-chart/doughnut-chart.component';
import {RadarChartComponent} from '../components/Master/radar-chart/radar-chart.component';
import {PieChartComponent} from '../components/Master/pie-chart/pie-chart.component';
import {AuthGuardService} from '../services/guard/auth-guard.service';
// import {LoginComponent} from '../components/master-components/login/login.component';
// import {RegisterComponent} from '../components/master-components/register/register.component';
// import {HomeComponent} from '../components/home/home.component';
// import {ProfileComponent} from '../components/profile/profile.component';
// import {Page404Component} from '../components/wildcards/page404/page404.component';
// import {AuthGuardService} from '../services/auth-guard/auth-guard.service';

const APP_ROUTES: Routes = [
  // {path: 'home', component: HomeComponent},
  // {path: 'login', component: LoginComponent},
  // {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'flowerpot/details', component: FlowerpotDetailsComponent, canActivate: [AuthGuardService]},
  {
    path: 'flowerpot/sensor-details',
    component: SensorDetailsComponent,
    children: [
      {path: 'bar-chart', component: BarChartComponent},
      {path: 'doughnut-chart', component: DoughnutChartComponent},
      {path: 'radar-chart', component: RadarChartComponent},
      {path: 'pie-chart', component: PieChartComponent}
    ]
    // , canActivate: [AuthGuardService]
  }
  // {path: '', component: HomeComponent},
  // {path: '**', pathMatch: 'full', component: Page404Component}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
