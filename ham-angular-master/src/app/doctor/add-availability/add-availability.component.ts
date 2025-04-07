import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AvailabilityService } from '../../service/availability/availability.service';
import { Availability } from '../../shared/model/availability.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-availability',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-availability.component.html',
  styleUrl: './add-availability.component.css'
})
export class AddAvailabilityComponent implements OnInit{
  
  availability: Availability = {
    doctorID: 0,
    date: '',
    timeSlots: []
  };
  minDate!: string;
  spinner:boolean=false;

  ngOnInit() {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; 
  }
  
  availableTimeSlots: string[] = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  constructor(
    private router: Router,
    private availabilityService: AvailabilityService,
    private toastr: ToastrService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.availability.doctorID = navigation?.extras.state?.['user'];
  }

  
  convertTo24HourFormat(time: string): string {
    let [hour, minutePart] = time.split(':');
    let minute = minutePart.substring(0, 2);
    let period = minutePart.slice(-2); 

    let hourNum = parseInt(hour, 10);
    if (period === 'PM' && hourNum < 12) {
      hourNum += 12;
    }
    if (period === 'AM' && hourNum === 12) {
      hourNum = 0;
    }

    return `${hourNum.toString().padStart(2, '0')}:${minute}`;
  }

 
  toggleTimeSlot(slot: string) {
    const convertedSlot = this.convertTo24HourFormat(slot);
    const selectedDate = new Date(this.availability.date);
    const today = new Date();
  
    if (selectedDate.toDateString() === today.toDateString()) {
      const [hour, minute] = convertedSlot.split(':').map(Number);
      const selectedTimeInMinutes = hour * 60 + minute;
      const currentTimeInMinutes = today.getHours() * 60 + today.getMinutes();
  
      if (selectedTimeInMinutes <= currentTimeInMinutes) {
        this.toastr.error("Cannot select past time slots.");
        return;
      }
    }
  
    const index = this.availability.timeSlots.indexOf(convertedSlot);
    if (index > -1) {
      this.availability.timeSlots.splice(index, 1);
    } else {
      this.availability.timeSlots.push(convertedSlot);
    }
  }

  createAvailability() {
    this.spinner = true;
    if (!this.availability.date) {
      this.toastr.error("Please select a date.");
      return;
    }
    if (this.availability.timeSlots.length === 0) {
      this.toastr.error("Please select at least one time slot.");
      return;
    }
    
    this.availabilityService.getAvailabilityByDoctorAndDate(this.availability.doctorID, this.availability.date)
      .subscribe(
        (existingAvailability) => {
          if (existingAvailability && existingAvailability.availabilityID) {
            this.toastr.error("Availability already exists for this date. Go to 'Edit Availability' to modify it.");
            return;
          } 
          this.availabilityService.createAvailability(this.availability).subscribe(
            response => {
              this.toastr.success('Availability created successfully!');
              this.spinner= false;
              this.availability.date = '';
              this.availability.timeSlots = [];
            },
            error => {
              this.toastr.error('Failed to create availability.');
            }
          );
        },
        (error) => {
          console.error('Error checking existing availability:', error);
          this.toastr.error('Failed to check existing availability.');
        }
      );
  }


  goBack() {
    this.router.navigate(['/doctor']);
  }
}


