import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  email: string;
  password: string;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  adminSignIn(): void {
    this.auth.signInAdmin(this.email, this.password)
  }

}
