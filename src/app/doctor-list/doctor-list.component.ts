import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Import CommonModule
import { NgIf, NgFor } from '@angular/common'; // Optional: if strict import

@Component({
  standalone: true,
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrl: './doctor-list.component.css',
  imports: [
    CommonModule // ✅ Fixes the *ngFor issue
  ],
})
export class DoctorListComponent implements OnInit {
  doctors: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.http.get<any[]>('http://192.168.0.63:3000/api/doctors').subscribe({
      next: (data) => {
        console.log('API response:', data);
        // ✅ Extract from [{ doctors: [...] }]
        this.doctors = Array.isArray(data[0]?.doctors) ? data[0].doctors : [];
      },
      error: (err) => {
        console.error('Failed to load doctors:', err);
        this.doctors = [];
      }
    });
  }

  editDoctor(id: string): void {
    this.router.navigate(['/edit-doctor', id]);
  }

  deleteDoctor(id: string): void {
    this.http.delete(`http://192.168.0.63:3000/api/doctors/${id}`).subscribe(() => {
      this.doctors = this.doctors.filter(doc => doc.id !== id);
    });
  }
}
