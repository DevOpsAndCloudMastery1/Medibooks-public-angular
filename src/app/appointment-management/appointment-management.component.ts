import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-appointment-management',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './appointment-management.component.html',
  styleUrl: './appointment-management.component.css'
})
export class AppointmentManagementComponent implements OnInit {
  availableDoctors = [
    { name: 'Dr. John Smith', specialization: 'Cardiologist', image: 'images/doctor1.jpg' },
    { name: 'Dr. Emma Davis', specialization: 'Neurologist', image: 'images/doctor2.jpg' },
    { name: 'Dr. Michael Brown', specialization: 'Pediatrician', image: 'images/doctor3.jpg' },
    { name: 'Dr. Olivia Wilson', specialization: 'Orthopedic Surgeon', image: 'images/doctor4.jpg' },
    { name: 'Dr. Liam Johnson', specialization: 'Dermatologist', image: 'images/doctor5.jpg' },
    { name: 'Dr. Sophia Martinez', specialization: 'Gynecologist', image: 'images/doctor6.jpg' }
  ];
  activeBookings: { doctor: string; date: string; time: string; status: string }[] = [];
  pastBookings: { doctor: string; date: string; status: string }[] = [];
  selectedDoctor: string = '';
  patientName: string = '';
  email: string = '';
  appointmentDate: string = '';
  appointmentConfirmed = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}


  ngOnInit(): void {

    console.log('Component Initialized');
    this.loadBookings();
  }

  selectDoctor(doctorName: string): void {
    this.selectedDoctor = doctorName;
  }

  bookAppointment(): void {
    if (!this.selectedDoctor || !this.patientName || !this.email || !this.appointmentDate) {
      alert('Please fill in all fields');
      return;
    }

    const newBooking = {
      doctor: this.selectedDoctor,
      date: this.appointmentDate,
      time: 'TBD',
      status: 'Confirmed'
    };

    this.activeBookings.push(newBooking);
    this.saveBookings();
    alert(`Appointment booked successfully!\n\n👨‍⚕️ Doctor: ${this.selectedDoctor}\n📅 Date: ${this.appointmentDate}\n👤 Patient: ${this.patientName}`);
    this.resetForm();
    this.loadBookings();
    this.appointmentConfirmed = true; // Show confirmation
  }

  resetForm(): void {
    this.selectedDoctor = '';
    this.patientName = '';
    this.email = '';
    this.appointmentDate = '';
  }

  loadBookings(): void {
    const storedActive = localStorage.getItem('activeBookings');
    const storedPast = localStorage.getItem('pastBookings');

    this.activeBookings = storedActive ? JSON.parse(storedActive) : [];
    this.pastBookings = storedPast ? JSON.parse(storedPast) : [];
    this.moveToPastBookings();
  }

  saveBookings(): void {
    localStorage.setItem('activeBookings', JSON.stringify(this.activeBookings));
    localStorage.setItem('pastBookings', JSON.stringify(this.pastBookings));
  }

  reschedule(index: number): void {
    const newDate = prompt('Enter a new date (YYYY-MM-DD):');
    if (newDate) {
      this.activeBookings[index].date = newDate;
      this.saveBookings();
      alert('Appointment rescheduled successfully!');
      this.loadBookings();
    }
  }

  cancel(index: number): void {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      const canceledBooking = this.activeBookings.splice(index, 1)[0];
      canceledBooking.status = 'Canceled';
      this.pastBookings.push(canceledBooking);
      this.saveBookings();
      alert('Appointment canceled successfully!');
      this.loadBookings();
    }
  }

  // Moves past appointments to pastBookings
  moveToPastBookings(): void {
    const currentDate = new Date().toISOString().split("T")[0];
    for (let i = this.activeBookings.length - 1; i >= 0; i--) {
      const bookingDate = new Date(this.activeBookings[i].date).toISOString().split("T")[0]; // Ensure format match
      if (this.activeBookings[i].date < currentDate) {
        const booking = this.activeBookings.splice(i, 1)[0];
        booking.status = 'Completed';  // or 'Missed', depending on your logic
        this.pastBookings.push(booking);
      }
    }
    this.saveBookings();  // Save after moving
  }
}