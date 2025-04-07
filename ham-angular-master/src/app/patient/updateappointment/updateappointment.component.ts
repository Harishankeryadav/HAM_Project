import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { AvailabilityService } from '../../service/availability/availability.service';
import { CommonModule } from '@angular/common';
import { AppointmentData } from '../../shared/model/appointment.model';

@Component({
  selector: 'app-updateappointment',
  imports: [CommonModule],
  templateUrl: './updateappointment.component.html',
  styleUrl: './updateappointment.component.css'
})
export class UpdateappointmentComponent implements OnInit {
  doctorID:number=0;
  appointment:AppointmentData;
  availabilities: any[] = [];
  selectedDate!: string;
  selectedTime!: string;
  selectedTimeSlots: string[] = [];

  constructor(private router: Router, 
    private appointmentService: AppointmentService,
    private availabilityService: AvailabilityService) {
    const navigation = this.router.getCurrentNavigation();
    this.appointment = navigation?.extras.state?.['appointment'];
  }

  ngOnInit(): void {
    this.fetchAvailability();
  }

  fetchAvailability() {
    const today = new Date(); 
    const currentTime = today.getHours() + ':' + today.getMinutes(); 
 
    this.availabilityService.getAvailabilityByDoctor(this.appointment.doctorID).subscribe(
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
    this.selectedTimeSlots = availability.timeSlots;
    this.selectedTime = ''; 
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

  updateAppointment() {
    if (!this.selectedDate || !this.selectedTime) return;
    const newTimeSlot = `${this.selectedDate}T${this.selectedTime}`;
    this.appointmentService.updateAppointment(Number(this.appointment.appointmentID), newTimeSlot).subscribe(
      (response) => {
        console.log('Appointment updated:', response);
        alert('Appointment updated successfully!');
        this.router.navigate(['/appointment/edit']);
      },
      (error) => {
        console.error('Error updating appointment:', error);
        alert('Failed to update appointment.');
      }
    );
  }

  goBack() {
    this.router.navigate(['appointment/edit']);
  }

}

