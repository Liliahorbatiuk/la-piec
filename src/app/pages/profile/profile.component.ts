import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any = null;
  firstName: string;
  lastName: string;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userCredential();
  }

  signOut(): void {
    this.authService.signOut();
  }

  private userCredential(): void {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.firstName = this.currentUser.firstName;
    this.lastName = this.currentUser.lastName;
  }

  save(): void {
    const data = {
      firstName: this.firstName,
      lastName: this.lastName,
    };
    this.authService.updateUserData(this.currentUser.id, data).then(() => {
      console.log('Update user successfully!');
      this.updateLocal(data);
    });
  }

  private updateLocal(data): void {
    const local = {
      ...this.currentUser,
      ...data
    };
    localStorage.setItem('user', JSON.stringify(local));
  }

}
