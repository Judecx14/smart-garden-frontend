import {Component, OnInit} from '@angular/core';
import {User} from '../../../interfaces/user';
import {AuthService} from '../../../services/auth/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id: number;
  details: User = {
    name: '',
    lastName: '',
    email: '',
  };

  form = new FormGroup({
    name: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  getUserDetails(): void {
    this.auth.getUserDetails().subscribe(data => {
      this.id = data.id;
      this.auth.profile(data.id).subscribe(
        user => {
          this.details = user;
        }, error => {
          console.error(error);
        }
      );
    });
  }

  updateUser(): void {
    this.auth.updateUser(this.details, this.id).subscribe(() => {
      },
      error => {
        console.error(error);
      }
    );
    this.getUserDetails();
  }

}
