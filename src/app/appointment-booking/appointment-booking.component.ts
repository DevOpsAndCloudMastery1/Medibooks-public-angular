import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: string;
  location: string;
}

@Component({
  selector: 'app-appointment-booking',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './appointment-booking.component.html',
  styleUrl: './appointment-booking.component.css'
})
export class AppointmentBookingComponent implements OnInit {
  doctorId: string | null = null;
  doctor: Doctor | undefined;
  appointmentConfirmed = false;
  appointmentData = {
    date: '',
    time: '',
    name: '',
    email: '',
    phone: ''
  };

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.doctorId = params['id'];
      if (this.doctorId) {
        this.http.get<{ doctors: Doctor[] }>('data/doctors.json').subscribe(data => {
          this.doctor = data.doctors.find(doc => doc.id === this.doctorId);
        });
      }
    });
  }

  bookAppointment(): void {
    this.appointmentConfirmed = true;
  }
}
