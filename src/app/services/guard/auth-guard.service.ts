import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  public res: boolean;

  constructor(private auth: AuthService, private router: Router) {
  }

  async canActivate(): Promise<boolean> {
    await this.auth.isLoggedIn().toPromise().then(result => {
      this.res = result.message;
    }).catch(error => {
      console.log(error);
    });
    if (!this.res) {
      await this.router.navigateByUrl('/');
      window.alert('vuelva a iniciar sesion');
      this.auth.logout();
      return false;
    } else {
      return true;
    }
  }
}
