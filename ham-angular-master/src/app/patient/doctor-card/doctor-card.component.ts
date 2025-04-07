import { Component, Input } from '@angular/core';
import { UserData } from '../../shared/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-card',
  imports: [],
  templateUrl: './doctor-card.component.html',
  styleUrl: './doctor-card.component.css'
})
export class DoctorCardComponent {
  @Input() doctor!: UserData;
  @Input() user!: UserData;

  constructor(private router: Router) {}

  bookAppointment() {
    this.router.navigate(['appointment/create'], { state: { doctor: this.doctor, user: this.user } });
  }
}
  
