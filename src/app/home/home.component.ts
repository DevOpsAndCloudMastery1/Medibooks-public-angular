import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  features = [
    { title: 'Search for Doctors', description: 'Explore our extensive list of healthcare professionals to find the right one for you.', link: '/doctor-search', buttonText: 'Search Doctors' },
    { title: 'Manage Your Profile', description: 'View and edit your personal information and preferences.', link: '/user-profile-edit', buttonText: 'Edit Profile' },
    { title: 'Book an Appointment', description: 'Schedule your appointment with your preferred doctor at your convenience.', link: '/appointment-booking', buttonText: 'Book Now' },
    { title: 'Manage Appointments', description: 'View, reschedule, or cancel your appointments easily.', link: '/appointment-management', buttonText: 'Manage Appointments' },
    { title: 'Doctor Reviews', description: 'Read and share reviews about doctors to help others make informed choices.', link: '/doctor-reviews', buttonText: 'View Reviews' },
    { title: 'Placeholder Feature', description: 'This is a placeholder for future functionality.', link: '#', buttonText: 'Coming Soon' }
  ];
  

}
