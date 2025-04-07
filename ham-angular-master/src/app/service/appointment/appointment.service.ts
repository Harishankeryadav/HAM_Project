import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment, AppointmentData } from '../../shared/model/appointment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private baseUrl = 'http://localhost:8093/appointments';

  constructor(private http: HttpClient) {}

  bookAppointment(appointment: Appointment): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.baseUrl}/book`, appointment);
  }

  getAppointmentsByDoctor(doctorID: number): Observable<AppointmentData[]> {
    return this.http.get<AppointmentData[]>(`${this.baseUrl}/doctor/${doctorID}`);
  }

  getAppointmentsByPatient(patientID: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/patient/${patientID}`);
  }

  cancelAppointment(appointmentID: number): Observable<AppointmentData> {
    return this.http.put<AppointmentData>(`${this.baseUrl}/cancel/${appointmentID}`, {});
  }

  updateAppointment(appointmentID: number, newTimeSlot: string) {
    return this.http.put(`${this.baseUrl}/update/${appointmentID}`, { timeSlot: newTimeSlot });
  }

  completeAppointment(appointmentID:number):Observable<AppointmentData>{
    return this.http.put<AppointmentData>(`${this.baseUrl}/completed/${appointmentID}`,{});
  }
}
