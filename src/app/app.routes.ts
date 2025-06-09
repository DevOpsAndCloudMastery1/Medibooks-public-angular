import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DoctorSearchComponent } from './doctor-search/doctor-search.component'; 
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { EditDoctorComponent } from './edit-doctor/edit-doctor.component';
import { AppointmentBookingComponent } from './appointment-booking/appointment-booking.component';
import { AppointmentManagementComponent } from './appointment-management/appointment-management.component';
import { UserProfileEditComponent } from './user-profile-edit/user-profile-edit.component'; 
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DoctorReviewsComponent } from './doctor-reviews/doctor-reviews.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'doctor-search', component: DoctorSearchComponent },
  { path: 'doctor-details/:id', component: DoctorDetailsComponent },
  { path: 'add-doctor', component: AddDoctorComponent },
  { path: 'doctor-list', component: DoctorListComponent },
  { path: 'edit-doctor/:id', component: EditDoctorComponent },
  { path: 'appointment-booking', component: AppointmentBookingComponent },
  { path: 'appointment-management', component: AppointmentManagementComponent },
  { path: 'user-profile', component: UserProfileComponent },
  { path: 'user-profile-edit', component: UserProfileEditComponent },
  { path: 'doctor-reviews', component: DoctorReviewsComponent},
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  ];

