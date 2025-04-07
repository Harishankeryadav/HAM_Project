import { Routes } from '@angular/router';
import { HomepageComponent } from './shared/homepage/homepage.component';
import { LoginComponent } from './shared/login/login.component';
import { SignupComponent } from './shared/signup/signup.component';
import { DoctorDashboardComponent } from './doctor/doctor-dashboard/doctor-dashboard.component';
import { PatientDashboardComponent } from './patient/patient-dashboard/patient-dashboard.component';
import { AddAvailabilityComponent } from './doctor/add-availability/add-availability.component';
import { AddConsultationComponent } from './doctor/add-consultation/add-consultation.component';
import { PastAppointmentsComponent } from './doctor/past-appointments/past-appointments.component';
import { EditAvailabilityComponent } from './doctor/edit-availability/edit-availability.component';
import { BookAppointmentComponent } from './patient/bookappiontment/bookappiontment.component';
import { EditAppointmentComponent } from './patient/edit-appointment/edit-appointment.component';
import { UpdateappointmentComponent } from './patient/updateappointment/updateappointment.component';
import { UpdateUserComponent } from './shared/update-user/update-user.component';
import { GetConsultationsComponent } from './patient/get-consultations/get-consultations.component';
import { doctorGuard } from './guards/doctor/doctor.guard';
import { patientGuard } from './guards/patient/patient.guard';


export const routes: Routes = [
    {path:'',component:HomepageComponent},
    {path:'login',component:LoginComponent},
    {path:'signup',component:SignupComponent},

    {path:'doctor',component:DoctorDashboardComponent,canActivate: [doctorGuard]},
    {path:'availability/create', component: AddAvailabilityComponent,canActivate: [doctorGuard] },
    {path:'availability/edit', component: EditAvailabilityComponent,canActivate: [doctorGuard] },
    {path:'consultation/create',component:AddConsultationComponent,canActivate: [doctorGuard]},
    {path:'appointment/get',component:PastAppointmentsComponent,canActivate:[doctorGuard]},

    {path:'patient',component:PatientDashboardComponent,canActivate: [patientGuard]},
    {path:'appointment/create',component:BookAppointmentComponent,canActivate: [patientGuard]},
    {path:'appointment/edit',component:EditAppointmentComponent,canActivate: [patientGuard]},
    {path:'consultations/get',component:GetConsultationsComponent,canActivate: [patientGuard]},
    {path:'appointment/update',component:UpdateappointmentComponent,canActivate: [patientGuard]},

    {path:'user/update',component:UpdateUserComponent}
];
