import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Doctor {
  id: string;
  name: string;
  img: string;
  specialization: string;
  experience: string;
  location: string;
  description: string;
}

@Component({
  selector: 'app-doctor-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']   // corrected here
})
export class DoctorDetailsComponent implements OnInit {
  doctorId: string | null = null;
  doctor: Doctor | null = null;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

 ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.doctorId = params.get('id');

      if (this.doctorId) {
        this.fetchDoctorDetails(this.doctorId);
      } else {
        this.errorMessage = 'Invalid doctor ID';
      }
    });
  }

  fetchDoctorDetails(id: string): void {
    this.http.get<any>(`http://192.168.0.63:3000/api/doctors/${id}`)
      .subscribe({
        next: (data) => {
          console.log('Doctor API raw response:', data);
          this.doctor = data.doctor ?? data;
          console.log('Assigned to component:', this.doctor);
},
        error: (err) => {
          console.error('Error fetching doctor:', err);
          this.errorMessage = 'Doctor not found or error loading details.';
        }
      });
  }
}
