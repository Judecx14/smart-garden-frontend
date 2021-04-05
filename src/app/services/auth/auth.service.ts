import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TokenResponse} from '../../interfaces/token-response';
import {User} from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
  }

  public getUserDetails(): Observable<any> {
    return this.http.get(environment.serverRoutes + 'loggedIn');
  }

  public getUser(id): Observable<any> {
    return this.http.get(environment.serverRoutes + `getUser/${id}`);
  }

  public isLoggedIn(): Observable<any> {
    return this.http.get(environment.serverRoutes + 'loginCheck');
  }

  public refresh(refreshToken): Observable<TokenResponse> {
    console.log(refreshToken);
    return this.http.post<TokenResponse>(environment.serverRoutes + 'refreshToken', refreshToken);
  }

  public navItems(): boolean {
    return this.cookieService.check('token');
    // return localStorage.getItem('value') === 'true';
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(environment.serverRoutes + 'register', user);
  }

  public updateUser(user: User, id): Observable<User> {
    return this.http.put<User>(environment.serverRoutes + `update/${id}`, user);
  }

  public login(user: User): Observable<any> {
    const base = this.http.post(`${environment.serverRoutes}login`, user);
    return base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.cookieService.set('token', data.token);
          this.cookieService.set('refreshToken', data.refreshToken);
        }
      })
    );
  }

  public profile(id): Observable<any> {
    return this.http.get(`${environment.serverRoutes}getuser/${id}`);
  }

  public logout(): void {
    this.cookieService.delete('refreshToken');
    this.cookieService.delete('token');
    this.router.navigateByUrl('/login').then(() => {
    });
  }
}
