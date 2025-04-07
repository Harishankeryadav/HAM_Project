import { Component, OnInit } from '@angular/core';
import { UserData } from '../../shared/model/user.model';
import { AppointmentData } from '../../shared/model/appointment.model';
import { Consultation } from '../../shared/model/consultation.model';
import { Router } from '@angular/router';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { ConsultationService } from '../../service/consultation/consultation.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-get-consultations',
  imports: [CommonModule],
  templateUrl: './get-consultations.component.html',
  styleUrl: './get-consultations.component.css'
})
export class GetConsultationsComponent implements OnInit {

  user: UserData;
  appointments: AppointmentData[] = [];
  consultation: Consultation = { appointmentID: 0, notes: '', prescription: '' };
  showConsultationDetails = false;

  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private consultationService: ConsultationService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras.state?.['user'];
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointmentsByPatient(Number(this.user.userID)).subscribe(
      (data: AppointmentData[]) => {
        this.appointments = data;
      },
      (error) => {
        console.error('Error fetching appointments', error);
      }
    );
  }

  viewConsultation(appointment: AppointmentData): void {
    this.consultationService.getConsultationByAppointmentID(appointment.appointmentID!).subscribe(
      (data: Consultation) => {
        this.consultation = data;
        this.showConsultationDetails = true;
      },
      (error) => {
        console.error('Error fetching consultation', error);
      }
    );
  }


}