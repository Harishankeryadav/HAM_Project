import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  imports: [FormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit {
  user: any = {};

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      alert('Session expired. Please log in again.');
      this.router.navigate(['/login']);
    }
  }

  updateUser() {
    this.userService.updateUser(this.user.userID, this.user).subscribe((updatedUser) => {
      alert('Profile updated successfully.');
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser)); 
      this.router.navigate(['/patient']);
    });
  }

  deleteUser() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.userService.deleteUser(this.user.userID).subscribe(() => {
        alert('Your account has been deleted.');
        localStorage.removeItem('loggedInUser');
        this.router.navigate(['/login']);
      });
    }
  }
}