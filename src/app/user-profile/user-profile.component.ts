import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent  implements OnInit {
  upcomingAppointments = [
    { doctor: 'Dr. John Smith - Cardiologist', date: '2025-02-10 14:00' }
  ];

  pastAppointments = [
    { doctor: 'Dr. Michael Brown - Pediatrician', date: '2025-01-06 10:30' }
  ];

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  cancelAppointment(index: number): void {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      this.upcomingAppointments.splice(index, 1);
      alert('Appointment canceled successfully!');
    }
  }

}
