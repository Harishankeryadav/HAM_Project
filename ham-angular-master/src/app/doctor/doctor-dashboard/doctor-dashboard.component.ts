import { Component, Input, OnInit } from '@angular/core';
import { UserData } from '../../shared/model/user.model';
import { Router, RouterModule } from '@angular/router';
import { ProfileComponent } from '../../shared/profile/profile.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { NavbarComponent } from "../../shared/navbar/navbar.component";

@Component({
  selector: 'app-doctor-dashboard',
  imports: [ProfileComponent, RouterModule, CommonModule, FormsModule, NavbarComponent],
  templateUrl: './doctor-dashboard.component.html',
  styleUrl: './doctor-dashboard.component.css'
})

export class DoctorDashboardComponent implements OnInit {
  user: UserData={};
  appointments: any[] = [];

  constructor(private router: Router,private appointmentService: AppointmentService) {
    const storedUser = localStorage.getItem('loggedInUser');
    if(storedUser){
      this.user = JSON.parse(storedUser);
    }else{
      alert('Session expired, Please login again.')
    }
  }

  gotoAvailabiltyPage(){
      this.router.navigate(['availability/create'], { state: { user: this.user.userID }});
  }
  
  gotoConsultationPage(){
    this.router.navigate(['consultation/create'], { state: { user: this.user }});
}

gotoAppointmentspage(){
  this.router.navigate(['appointment/get'],{ state: { user: this.user }})
}

fetchTodaysAppointments(): void {
  this.appointmentService.getAppointmentsByDoctor(Number(this.user.userID)).subscribe(
    (data) => {
      const today = new Date().toISOString().split('T')[0];
      this.appointments = data.filter(appointment => appointment.timeSlot.startsWith(today));
    },
    (error) => {
      console.error('Error fetching appointments', error);
    }
  );
}

ngOnInit(): void {
  this.fetchTodaysAppointments();
}

gotoEditAvailabilityPage(){
  this.router.navigate(['availability/edit'], { state: { user: this.user.userID }});
}

}
