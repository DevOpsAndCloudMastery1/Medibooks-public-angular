import { Component, OnInit, inject, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doctor-reviews',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './doctor-reviews.component.html',
  styleUrl: './doctor-reviews.component.css'
})
export class DoctorReviewsComponent implements OnInit, AfterViewInit {
  selectedDoctor: string = 'Dr. John Smith';
  reviews: any[] = [];
  newReview: any = { rating: '5', text: '' };
  private router = inject(Router);

  constructor() { }

  ngOnInit(): void {
    // Initial setup (if any) that doesn't require localStorage
  }

  ngAfterViewInit(): void {
    // Load reviews after the view has been initialized in the browser
    this.loadReviews();
  }

  loadReviews() {
    if (typeof localStorage !== 'undefined') {
      try {
        let storedReviews = JSON.parse(localStorage.getItem('doctorReviews') || '[]');
        this.reviews = storedReviews.filter((r: any) => r.doctor === this.selectedDoctor);
      } catch (error) {
        console.error("Error parsing localStorage:", error);
        this.reviews = []; // Handle parsing errors gracefully
      }
    } else {
      console.warn('localStorage is not available. Using default reviews.');
      this.reviews = []; // Or some default data.
    }
  }

  submitReview() {
    if (!this.newReview.text.trim()) {
      alert('Please enter a review before submitting.');
      return;
    }

    const review = {
      doctor: this.selectedDoctor,
      rating: this.newReview.rating,
      text: this.newReview.text,
      date: new Date().toLocaleDateString(),
    };

    if (typeof localStorage !== 'undefined') {
      try {
        let storedReviews = JSON.parse(localStorage.getItem('doctorReviews') || '[]');
        storedReviews.push(review);
        localStorage.setItem('doctorReviews', JSON.stringify(storedReviews));
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        // Handle saving errors gracefully (e.g., display an error message)
      }
    } else {
      console.warn('localStorage is not available. Review not saved.');
      // Consider alternative storage (in-memory, cookie, etc.)
    }

    this.loadReviews(); // Refresh the review list
    this.newReview.text = '';
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}