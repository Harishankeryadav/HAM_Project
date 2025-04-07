import { Component, OnInit } from '@angular/core';

import { AvailabilityService } from '../../service/availability/availability.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-availability',
  imports: [CommonModule],
  templateUrl: './edit-availability.component.html',
  styleUrl: './edit-availability.component.css'
})
export class EditAvailabilityComponent implements OnInit {
  doctorID: number;
  availabilityList: any[] = [];
  selectedAvailability: any = null;
  availableTimeSlots: string[] = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM'
  ];
  spinner:boolean=false;

  constructor(
    private router: Router,
    private availabilityService: AvailabilityService,
    private toastr: ToastrService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.doctorID = navigation?.extras.state?.['user'];
  }

  ngOnInit(): void {
    this.fetchAvailability();
  }

  fetchAvailability() {
    this.availabilityService.getAvailabilityByDoctor(this.doctorID).subscribe(
      (data) => {
        this.availabilityList = data;
      },
      (error) => {
        console.error('Error fetching availability:', error);
      }
    );
  }


  selectAvailability(availability: any) {
    this.selectedAvailability = availability ;
  }

  toggleTimeSlot(slot: string) {
    const convertedSlot = this.convertTo24HourFormat(slot);
    const index = this.selectedAvailability.timeSlots.indexOf(convertedSlot);

    if (index > -1) {
      this.selectedAvailability.timeSlots.splice(index, 1); 
    } else {
      this.selectedAvailability.timeSlots.push(convertedSlot);
    }
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


  updateAvailability() {
    this.spinner=true;
    this.availabilityService.updateAvailability(this.selectedAvailability.availabilityID, this.selectedAvailability)
      .subscribe(
        () => {
          this.toastr.success('Availability updated successfully!');
          this.spinner=false;
          this.fetchAvailability();
          this.selectedAvailability = null;
        },
        (error) => {
          console.error('Error updating availability:', error);
          this.toastr.error('Failed to update availability.');
        }
      );
  }

  deleteAvailability(id: number) {
    if (confirm('Are you sure you want to delete this availability?')) {
      this.availabilityService.deleteAvailability(id).subscribe(
        () => {
          this.toastr.success('Availability deleted successfully!');
          this.fetchAvailability();
        },
        (error) => {
          console.error('Error deleting availability:', error);
          this.toastr.error('Failed to delete availability.');
        }
      );
    }
  }

  goBack() {
    this.router.navigate(['/doctor']);
  }
}

