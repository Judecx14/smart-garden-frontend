import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from '../components/Master/profile/profile.component';
import {FlowerpotDetailsComponent} from '../components/flowerpot-details/flowerpot-details.component';
import {SensorDetailsComponent} from '../components/sensor-details/sensor-details.component';
import {BarChartComponent} from '../components/Master/bar-chart/bar-chart.component';
import {DoughnutChartComponent} from '../components/Master/doughnut-chart/doughnut-chart.component';
import {RadarChartComponent} from '../components/Master/radar-chart/radar-chart.component';
import {PieChartComponent} from '../components/Master/pie-chart/pie-chart.component';
import {AuthGuardService} from '../services/guard/auth-guard.service';
import {LoginComponent} from '../components/Master/login/login.component';
import {IndexComponent} from '../components/Master/index/index.component';
import {RegisterComponent} from '../components/Master/register/register.component';
import {GardenComponent} from '../components/garden/garden.component';
import {FlowerpotGraphicsComponent} from '../components/flowerpot-graphics/flowerpot-graphics.component';
import {QrCodeComponent} from '../components/qr-code/qr-code.component';
import {PlantsComponent} from '../components/plants/plants.component';
import {Wildcard404Component} from '../components/Master/wildcard404/wildcard404.component';
import {GraphicsComponent} from '../components/details/graphics/graphics.component';
// import {LoginComponent} from '../components/master-components/login/login.component';
// import {RegisterComponent} from '../components/master-components/register/register.component';
// import {HomeComponent} from '../components/home/home.component';
// import {ProfileComponent} from '../components/profile/profile.component';
// import {Page404Component} from '../components/wildcards/page404/page404.component';
// import {AuthGuardService} from '../services/auth-guard/auth-guard.service';

const APP_ROUTES: Routes = [
  {path: 'home', component: IndexComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'gardens', component: GardenComponent},
  {path: 'flowerpot/graphics', component: FlowerpotGraphicsComponent},
  {path: 'flowerpot/qr', component: QrCodeComponent},
  {path: 'gardens/flowerpots/:id', component: PlantsComponent},
  {path: 'gardens/flowerpots/:i/flowerpot/:id', component: GraphicsComponent},
  // , canActivate: [AuthGuardService]},
  {path: 'flowerpot/details/', component: FlowerpotDetailsComponent},
  // , canActivate: [AuthGuardService]},
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
  },
  {path: '', component: IndexComponent},
  {path: '**', pathMatch: 'full', component: Wildcard404Component}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
