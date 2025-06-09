import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Doctor {
  name: string;
  img: string;
  specialization: string;
  experience: string;
  location: string;
  description: string;
}

@Component({
  selector: 'app-add-doctor',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HttpClientModule],
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent {
  newDoctor: Doctor = {
    name: '',
    img: '',
    specialization: '',
    experience: '',
    location: '',
    description: ''
  };

  submitted = false;
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  addDoctor() {
    // Simple required field check
    if (!this.newDoctor.name || !this.newDoctor.specialization) {
      this.errorMessage = 'Name and specialization are required.';
      return;
    }

    this.http.post('http://192.168.0.63:3000/api/doctors', this.newDoctor).subscribe({
      next: (response) => {
        console.log('Doctor added successfully:', response);
        this.submitted = true;
        this.errorMessage = '';

        // Reset form
        this.newDoctor = {
          name: '',
          img: '',
          specialization: '',
          experience: '',
          location: '',
          description: ''
        };

        // Redirect to doctor list after 2 seconds
        setTimeout(() => this.router.navigate(['/doctor-search']), 2000);
      },
      error: (error) => {
        console.error('Error adding doctor:', error);
        this.errorMessage = 'Failed to add doctor. Please try again.';
        this.submitted = false;
      }
    });
  }
}
