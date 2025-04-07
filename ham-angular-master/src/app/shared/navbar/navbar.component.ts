import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
  user: any;

  constructor(private router: Router) {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  logout() {
    localStorage.removeItem('loggedInUser'); 
    this.router.navigate(['/login']);
  }

  updateUser() {
    this.router.navigate(['user/update']);
  }
}