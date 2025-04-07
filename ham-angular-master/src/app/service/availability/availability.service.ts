import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Availability } from '../../shared/model/availability.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {

  private baseUrl = 'http://localhost:8092/availability';

  constructor(private http: HttpClient) {}

  createAvailability(availability: Availability): Observable<Availability> {
    return this.http.post<Availability>(`${this.baseUrl}/create`, availability);
  }

  getAvailabilityByDoctor(doctorID: number): Observable<Availability[]> {
    return this.http.get<Availability[]>(`${this.baseUrl}/doctor/${doctorID}`);
  }

  updateAvailability(availabilityId: number, availability: any): Observable<Availability> {
    return this.http.put<Availability>(`${this.baseUrl}/update/${availabilityId}`, availability);
  }

  deleteAvailability(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  getAvailabilityByDoctorAndDate(doctorID: number, date: string) {
    return this.http.get<Availability | null>(`${this.baseUrl}/doctor/${doctorID}/date/${date}`);
  }



}
