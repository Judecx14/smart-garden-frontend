import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../services/auth/auth.service';
import {User} from '../../../interfaces/user';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  message: string = null;
  user: User;

  timerInterval: number;

  constructor(private auth: AuthService, private cookieService: CookieService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.user = this.form.value;
    this.auth.login(this.user).subscribe(
      data => {
        if (this.cookieService.check('token')) {
          Swal.fire({
            icon: 'success',
            title: 'Ingresando',
            html: 'usuario autentificado!',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              this.timerInterval = setInterval(() => {
              }, 100);
            },
            willClose: () => {
              clearInterval(this.timerInterval);
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer');
              this.router.navigateByUrl('/profile').then(() => {
              });
            }
          });
        } else {
          return {message: 'user not found'};
        }
      },
      error => {
        if (error.status === 401) {
          this.message = 'Usuario no valido';
        }
      }
    );
  }

}
