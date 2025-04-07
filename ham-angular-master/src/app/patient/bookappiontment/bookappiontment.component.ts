import { Component, OnInit } from '@angular/core';
import { Appointment, AppointmentData } from '../../shared/model/appointment.model';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AvailabilityService } from '../../service/availability/availability.service';

@Component({
  selector: 'app-bookappiontment',
  imports: [FormsModule,CommonModule],
  templateUrl: './bookappiontment.component.html',
  styleUrl: './bookappiontment.component.css'
})
export class BookAppointmentComponent implements OnInit {
  doctor!: any;
  user!: any;
  availabilities: any[] = [];
  selectedDate!: string;
  selectedTime!: string;
  selectedTimeSlots: string[] = [];

  constructor(
    private appointmentService: AppointmentService,
    private availabilityService: AvailabilityService,
    private router: Router
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.doctor = navigation?.extras.state?.['doctor']; 
    this.user = navigation?.extras.state?.['user'];  
  }

  ngOnInit(): void {
    if (!this.doctor || !this.user) {
      alert('Invalid access! Returning to patient dashboard.');
      this.router.navigate(['/patient']);
      return;
    }
    this.fetchAvailability();
  }

  fetchAvailability() {
    const today = new Date();
    const currentTime = today.getHours() + ':' + today.getMinutes(); 
 
    this.availabilityService.getAvailabilityByDoctor(this.doctor.userID).subscribe(
      (data) => {
        this.availabilities = data.map(availability => {
          const availabilityDate = new Date(availability.date);
          if (availabilityDate > today) {
            return availability;
          } else if (availabilityDate.toDateString() === today.toDateString()) {
            availability.timeSlots = availability.timeSlots.filter(timeSlot => timeSlot > currentTime);
            return availability;
          }
          return null;
        }).filter(availability => availability !== null);
        console.log(this.availabilities);
      },
      (error) => {
        console.error('Error fetching availability:', error);
      }
    );
  }

selectDate(availability: any) {
  this.selectedDate = availability.date;
  const today = new Date();
  const selectedDateObj = new Date(this.selectedDate);
    this.selectedTimeSlots = availability.timeSlots;
  this.selectedTime = ''; 
}
  selectTime(time: string) {
    this.selectedTime = time;
  }

  bookAppointment() {
    if (!this.selectedDate || !this.selectedTime) return;

    const appointment: AppointmentData = {
      patientID: this.user.userID,
      doctorID: this.doctor.userID,
      timeSlot: `${this.selectedDate}T${this.selectedTime}`,
      status: 'Booked'
    };

    console.log(appointment);

    this.appointmentService.bookAppointment(appointment).subscribe(
      (response) => {
        console.log('Appointment booked:', response);
        alert('Appointment booked successfully!');
        this.router.navigate(['/patient']);
      },
      (error) => {
        console.error('Error booking appointment:', error);
        alert('Failed to book appointment.');
      }
    );
  }

}