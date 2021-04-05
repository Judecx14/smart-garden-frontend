import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Sensor} from '../../classes/sensor';
import {Flowerpot} from '../../classes/flowerpot';
import {Category} from '../../classes/category';
import {FlowerpotSensor} from '../../classes/flowerpot-sensor';
import {Measure} from '../../classes/measure';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(private http: HttpClient) {

  }

  createSensor(sensor: Sensor): Observable<any> {
    return this.http.post(`${environment.apiRoutes}newSensor`, sensor);
  }

  createFlowerpot(flowerpot: Flowerpot): Observable<any> {
    return this.http.post(`${environment.apiRoutes}newSensor`, flowerpot);
  }

  createCategory(category: Category): Observable<any> {
    return this.http.post(`${environment.apiRoutes}newSensor`, category);
  }

  createFlowerpotSensor(flowerpotSensor: FlowerpotSensor): Observable<any> {
    return this.http.post(`${environment.apiRoutes}newSensor`, flowerpotSensor);
  }

  createMeasure(measure: Measure): Observable<any> {
    return this.http.post(`${environment.apiRoutes}newSensor`, measure);
  }

  indexSensor(): Observable<any> {
    return this.http.get(`${environment.apiRoutes}Sensor/index`);
  }

  indexFlowerpot(): Observable<any> {
    return this.http.get(`${environment.apiRoutes}Flowerpot/index`);
  }

  indexCategory(): Observable<any> {
    return this.http.get(`${environment.apiRoutes}Category/index`);
  }

  indexFlowerpotSensor(): Observable<any> {
    return this.http.get(`${environment.apiRoutes}FlowerpotSensor/index`);
  }

  indexMeasure(): Observable<any> {
    return this.http.get(`${environment.apiRoutes}Measure/index`);
  }

  showSensor(id: number): Observable<any> {
    return this.http.get(`${environment.apiRoutes}Sensor/show?id=${id}`);
  }

  showFlowerpot(id: number): Observable<any> {
    return this.http.get(`${environment.apiRoutes}Flowerpot/show?id=${id}`);
  }

  showCategory(id: number): Observable<any> {
    return this.http.get(`${environment.apiRoutes}Category/show?id=${id}`);
  }

  showFlowerpotSensor(id: number): Observable<any> {
    return this.http.get(`${environment.apiRoutes}FlowerpotSensor/show?id=${id}`);
  }

  showMeasure(id: number): Observable<any> {
    return this.http.get(`${environment.apiRoutes}Measure/show?id=${id}`);
  }

  deleteSensor(id: number): Observable<any> {
    return this.http.delete(`${environment.apiRoutes}Sensor/delete?id=${id}`);
  }

  deleteFlowerpot(id: number): Observable<any> {
    return this.http.delete(`${environment.apiRoutes}Flowerpot/delete?id=${id}`);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${environment.apiRoutes}Category/delete?id=${id}`);
  }

  deleteFlowerpotSensor(id: number): Observable<any> {
    return this.http.delete(`${environment.apiRoutes}FlowerpotSensor/delete?id=${id}`);
  }

  deleteMeasure(id: number): Observable<any> {
    return this.http.delete(`${environment.apiRoutes}Measure/delete?id=${id}`);
  }

  updateSensor(sensor: Sensor): Observable<any> {
    return this.http.put(`${environment.apiRoutes}Sensor/update`, sensor);
  }

  updateFlowerpot(flowerpot: Flowerpot): Observable<any> {
    return this.http.put(`${environment.apiRoutes}Flowerpot/update`, flowerpot);
  }

  updateCategory(category: Category): Observable<any> {
    return this.http.put(`${environment.apiRoutes}Category/update`, category);
  }

  updateFlowerpotSensor(flowerpotSensor: FlowerpotSensor): Observable<any> {
    return this.http.put(`${environment.apiRoutes}FlowerpotSensor/update`, FlowerpotSensor);
  }

  updateMeasure(measure: Measure): Observable<any> {
    return this.http.put(`${environment.apiRoutes}MeasureSensor/update`, measure);
  }

  showSensorMeasure(id: number): Observable<any> {
    return this.http.get(`${environment.apiRoutes}Sensor/showMeasure?id=${id}`);
  }

  showFlowerpotSensorsMeasure(id: number): Observable<any> {
    return this.http.get(`${environment.apiRoutes}Flowerpot/showFLSN?id=${id}`);
  }

  showSensorByName(name: string): Observable<any> {
    return this.http.get(`${environment.apiRoutes}Sensor/show?name=${name}`);
  }

  showFlowerpotByName(name: string): Observable<any> {
    return this.http.get(`${environment.apiRoutes}Flowerpot/show?name=${name}`);
  }

  showSensorByType(type: string): Observable<any> {
    return this.http.get(`${environment.apiRoutes}Sensor/show?type=${type}`);
  }

  showFlowerpotByCategory(category: string): Observable<any> {
    return this.http.get(`${environment.apiRoutes}Flowerpot/show?category=${category}`);
  }
}
