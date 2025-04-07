import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Consultation } from '../../shared/model/consultation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  private baseUrl = 'http://localhost:8094/consultations';

  constructor(private http: HttpClient) { }

  addConsultation(consultation: Consultation): Observable<Consultation> {
    return this.http.post<Consultation>(`${this.baseUrl}/add`, consultation);
  }

  getConsultationByAppointmentID(appointmentID: number): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.baseUrl}/appointment/${appointmentID}`);
  }

  updateConsultation(consultationID: number, notes: string, prescription: string): Observable<Consultation> {
    const params = new HttpParams()
      .set('notes', notes)
      .set('prescription', prescription);

    return this.http.put<Consultation>(`${this.baseUrl}/update/${consultationID}`, {}, { params });
  }

  deleteConsultation(consultationID: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${consultationID}`);
  }
}
