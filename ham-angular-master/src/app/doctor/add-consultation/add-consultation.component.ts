import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { ConsultationService } from '../../service/consultation/consultation.service';
import { Router } from '@angular/router';
import { UserData } from '../../shared/model/user.model';
import { Appointment, AppointmentData } from '../../shared/model/appointment.model';
import { Consultation } from '../../shared/model/consultation.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-consultation',
  imports: [FormsModule,CommonModule],
  templateUrl: './add-consultation.component.html',
  styleUrl: './add-consultation.component.css'
})
export class AddConsultationComponent implements OnInit {

  user: UserData;
  appointments: AppointmentData[] = [];
  consultation: Consultation = { appointmentID: 0, notes: '', prescription: '' };
  showConsultationForm = false;
  showConsultationDetails = false;
  showUpdateForm = false;

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
    this.appointmentService.getAppointmentsByDoctor(Number(this.user.userID)).subscribe(
      (data: AppointmentData[]) => {
        this.appointments = data;
      },
      (error) => {
        console.error('Error fetching appointments', error);
      }
    );
  }

  addConsultation(appointment: AppointmentData): void {
    this.consultation = { appointmentID: appointment.appointmentID!, notes: '', prescription: '' };
    this.showConsultationForm = true;
    this.showUpdateForm = false;
    this.showConsultationDetails = false;
  }

  editConsultation(appointment: AppointmentData): void {
    this.consultationService.getConsultationByAppointmentID(appointment.appointmentID!).subscribe(
      (data: Consultation) => {
        this.consultation = data;
        this.showUpdateForm = true;
        this.showConsultationForm = false;
        this.showConsultationDetails = false;
      },
      (error) => {
        console.error('Error fetching consultation', error);
      }
    );
  }

  updateConsultation(): void {
    this.consultationService.updateConsultation(this.consultation.consultationID!, this.consultation.notes, this.consultation.prescription).subscribe(
      (data: Consultation) => {
        console.log('Consultation updated:', data);
        this.showUpdateForm = false;
        this.loadAppointments();
      },
      (error) => {
        console.error('Error updating consultation', error);
      }
    );
  }

  viewConsultation(appointment: AppointmentData): void {
    this.consultationService.getConsultationByAppointmentID(appointment.appointmentID!).subscribe(
      (data: Consultation) => {
        this.consultation = data;
        this.showConsultationDetails = true;
        this.showConsultationForm = false;
        this.showUpdateForm = false;
      },
      (error) => {
        console.error('Error fetching consultation', error);
      }
    );
  }

  submitConsultation(): void {
    this.consultationService.addConsultation(this.consultation).subscribe(
      (data: Consultation) => {
        console.log('Consultation added:', data);
        this.showConsultationForm = false;
        this.loadAppointments();
      },
      (error) => {
        console.error('Error adding consultation', error);
      }
    );
  }

  deleteConsultation(consultationID: number): void {
    this.consultationService.deleteConsultation(consultationID).subscribe(
      () => {
        console.log('Consultation deleted');
        this.loadAppointments();
      },
      (error) => {
        console.error('Error deleting consultation', error);
      }
    );
  }
}