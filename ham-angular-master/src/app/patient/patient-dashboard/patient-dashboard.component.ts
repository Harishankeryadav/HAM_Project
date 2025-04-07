import { Component, Input, OnInit } from '@angular/core';
import { User, UserData } from '../../shared/model/user.model';
import { Router } from '@angular/router';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { UserService } from '../../service/user/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { DoctorCardComponent } from '../doctor-card/doctor-card.component';
import { NavbarComponent } from "../../shared/navbar/navbar.component";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-patient-dashboard',
  imports: [ProfileComponent, CommonModule, FormsModule, DoctorCardComponent, NavbarComponent],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.css'
})
export class PatientDashboardComponent implements OnInit {
  user: UserData = {};
  doctors: any[] = [];
  filteredDoctors: any[] = [];
  searchTerm: string = '';

  constructor(private router: Router, private userService: UserService) {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      alert('Session expired, Please login again.');
    }
  }

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors(): void {
    this.userService.getUsersByRole('doctor').subscribe(
      (data) => {
        this.doctors = data;
        this.filteredDoctors = data;
      },
      (error) => {
        console.error('Error fetching doctors', error);
      }
    );
  }

  filterDoctors(): void {
    if (!this.searchTerm.trim()) {
      this.filteredDoctors = this.doctors;
      return;
    }
    
    this.filteredDoctors = this.doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  goToEditAppointments() {
    this.router.navigate(['appointment/edit'], { state: { user: this.user } });
  }
  goToGetConsultations() {
    this.router.navigate(['consultations/get'], { state: { user: this.user } });
  }
}