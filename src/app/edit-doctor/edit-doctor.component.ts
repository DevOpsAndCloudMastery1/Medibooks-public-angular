import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-edit-doctor',
  templateUrl: './edit-doctor.component.html',
  styleUrl: './edit-doctor.component.css',
  imports: [CommonModule, FormsModule]
})
export class EditDoctorComponent implements OnInit {
  doctorId!: string;
  doctor: any = null;
  errorMessage: string = '';
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.paramMap.get('id')!;
    this.http.get(`http://192.168.0.63:3000/api/doctors/${this.doctorId}`)
      .subscribe({
        next: (data: any) => {
        console.log('API response:', data); // ✅ check in console
        this.doctor = data.doctor ?? data; // fallback to data if no .doctor key
      },
       error: () => {
        this.errorMessage = 'Doctor not found.';
       }
      });
  }

updateDoctor(): void {
  this.http.put(`http://192.168.0.63:3000/api/doctors/${this.doctorId}`, this.doctor)
    .subscribe({
      next: () => {
        this.submitted = true;
        this.errorMessage = '';
        // ✅ Force component reload after navigation
        setTimeout(() => {
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/doctor-list']);
          });
        }, 2000);
      },
      error: () => {
        this.errorMessage = 'Failed to update doctor. Please try again.';
        this.submitted = false;
      }
    });
}

}
