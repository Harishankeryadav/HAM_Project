import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-appointment',
  imports: [CommonModule],
  templateUrl: './edit-appointment.component.html',
  styleUrl: './edit-appointment.component.css'
})
export class EditAppointmentComponent implements OnInit {
    user: any;
    appointments: any[] = [];
  
    constructor(private router: Router, private appointmentService: AppointmentService) {
      const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      alert('Session expired, Please login again.');
    }

    }
  
    ngOnInit(): void {
      this.fetchAppointments();
    }
  
    fetchAppointments() {
      const now = new Date();
    
      this.appointmentService.getAppointmentsByPatient(this.user.userID).subscribe(
        (data) => {
          this.appointments = data.filter(app => {
            const appointmentDateTime = new Date(app.timeSlot);
            return app.status === 'Booked' && appointmentDateTime >= now;
          });
        },
        (error) => {
          console.error('Error fetching appointments:', error);
        }
      );
    }

    cancelAppointment(appointmentID: number) {
      if (confirm('Are you sure you want to cancel this appointment?')) {
        this.appointmentService.cancelAppointment(appointmentID).subscribe(() => {
          alert('Appointment canceled successfully.');
          this.fetchAppointments(); 
        });
      }
    }
  
    editAppointment(appointment: any) {
      console.log(appointment);
      this.router.navigate(['appointment/update'], { state: { appointment: appointment } });
    }

    goBack() {
      this.router.navigate(['/patient']);
    }
  }