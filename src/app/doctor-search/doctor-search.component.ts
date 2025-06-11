import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Doctor {
  id: string; // Changed to string to match API
  name: string;
  specialization: string; // Removed duplicate
  img: string;
  experience: string;
  }

@Component({
  selector: 'app-doctor-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './doctor-search.component.html',
  styleUrls: ['./doctor-search.component.css'] // Changed to styleUrls
})
export class DoctorSearchComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  private _searchTerm: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.http.get<Doctor[]>('http://192.168.0.63:3000/api/doctors')
      .subscribe({
        next: (data) => {
          console.log('API Response:', data); // Debug
          this.doctors = data;
          console.log('Assigned doctors:', this.doctors); // Debug
          this.filteredDoctors = data;
        },
        error: (err) => {
          console.error('Error loading doctors:', err);
          this.doctors = [];
          this.filteredDoctors = [];
        }
      });
  }

  // Getter and setter for search term
  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterDoctors();
  }

  // Normalize image paths
  getImagePath(img: string): string {
    return img.replace(/^(assets|assests)\/images\//, '');
  }

  // Filter doctors based on search term
  filterDoctors(): void {
    const filter = this.searchTerm.toLowerCase();
    this.filteredDoctors = this.doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(filter) ||
      doctor.specialization.toLowerCase().includes(filter)
    );
  }


deleteDoctor(id: string): void {
  const confirmDelete = confirm('Are you sure you want to delete this doctor?');
  if (!confirmDelete) return;

  this.http.delete(`http://192.168.0.63:3000/api/doctors/${id}`)
    .subscribe({
      next: () => {
        this.doctors = this.doctors.filter((doctor: Doctor) => doctor.id !== id);
        this.filterDoctors(); // Refresh filtered list
      },
      error: (err: any) => {
        console.error('Failed to delete doctor:', err);
      }
    });
}

}
