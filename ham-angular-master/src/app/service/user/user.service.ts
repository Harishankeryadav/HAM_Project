import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, userLogin } from '../../shared/model/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private baseUrl = "http://localhost:8090/users"

  constructor(private http:HttpClient) { }

  addUser(u:User):Observable<User>{
    return <Observable<User>>this.http.post(`${this.baseUrl}/register`,u);
  }

  loginUser(u: userLogin): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/login`, u);
  }

  getUsersByRole(role: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/role/${role}`);
  }

  updateUser(userID: number, userData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${userID}`, userData);
}

deleteUser(userID: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${userID}`);
}

}
