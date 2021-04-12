import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  status: boolean;

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e): void {
    this.status = window.pageYOffset > 170;
  }

}
