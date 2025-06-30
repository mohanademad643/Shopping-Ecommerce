import { Component, OnInit, signal } from '@angular/core';
import { Register } from 'src/app/Models/Auth';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements  OnInit {

  // User data signal
  userData = signal<Register>({} as Register);

  ngOnInit(): void {
    this.loadUserData();
  }

   loadUserData(): void {
    const userData = localStorage.getItem('UserToken');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        this.userData.set(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }


}
