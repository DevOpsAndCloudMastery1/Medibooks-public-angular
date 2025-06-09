import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentManagementComponent } from './appointment-management.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('AppointmentManagementComponent', () => {
  let component: AppointmentManagementComponent;
  let fixture: ComponentFixture<AppointmentManagementComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, AppointmentManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentManagementComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display available doctors', () => {
    const doctorCards = el.queryAll(By.css('.card'));
    expect(doctorCards.length).toBe(6); // Updated to reflect the fixed number of doctors
  });

  it('should set selectedDoctor when selectDoctor is called', () => {
    const doctorName = 'Dr. Test Doctor - Test';
    component.selectDoctor(doctorName);
    expect(component.selectedDoctor).toBe(doctorName);
  });

  it('should display the selected doctor in the form', () => {
    const doctorName = 'Dr. Test Doctor - Test';
    component.selectDoctor(doctorName);
    fixture.detectChanges();
    const doctorInput = el.query(By.css('#doctor')).nativeElement;
    expect(doctorInput.value).toBe(doctorName);
  });

  it('should book an appointment when the form is submitted with valid data', () => {
    spyOn(window, 'alert'); // Spy on the alert method to prevent it from actually showing

    component.selectedDoctor = 'Dr. Test Doctor - Test';
    component.patientName = 'Test Patient';
    component.email = 'test@example.com';
    component.appointmentDate = '2024-01-01';

    const form = el.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    expect(component.activeBookings.length).toBe(1);
    expect(component.activeBookings[0].doctor).toBe('Dr. Test Doctor - Test');
    expect(component.activeBookings[0].date).toBe('2024-01-01');
    expect(component.activeBookings[0].time).toBe('TBD');
    expect(component.activeBookings[0].status).toBe('Confirmed');
    expect(window.alert).toHaveBeenCalledWith('Appointment booked successfully!');
  });

    it('should display an alert when the form is submitted with missing data', () => {
    spyOn(window, 'alert');
    const form = el.query(By.css('form'));
    form.triggerEventHandler('submit', null);
    expect(window.alert).toHaveBeenCalledWith('Please fill in all fields');
  });

  it('should reset the form after booking an appointment', () => {
    component.selectedDoctor = 'Dr. Test Doctor - Test';
    component.patientName = 'Test Patient';
    component.email = 'test@example.com';
    component.appointmentDate = '2024-01-01';

    component.bookAppointment();

    expect(component.selectedDoctor).toBe('');
    expect(component.patientName).toBe('');
    expect(component.email).toBe('');
    expect(component.appointmentDate).toBe('');
  });

    it('should load bookings from localStorage on initialization', () => {
    const activeBookings = [{ doctor: 'Dr. Test', date: '2024-01-01', time: 'TBD', status: 'Confirmed' }];
    const pastBookings: any[] = []; // Define pastBookings as an empty array of type any[]
    localStorage.setItem('activeBookings', JSON.stringify(activeBookings));
    localStorage.setItem('pastBookings', JSON.stringify(pastBookings));

    fixture = TestBed.createComponent(AppointmentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.activeBookings.length).toBe(1);
    expect(component.activeBookings[0].doctor).toBe('Dr. Test');
    expect(component.pastBookings.length).toBe(0);
  });

  describe('reschedule', () => {
    it('should reschedule an appointment', () => {
      const initialDate = '2024-01-01';
      component.activeBookings = [{ doctor: 'Dr. Test', date: initialDate, time: 'TBD', status: 'Confirmed' }];
      spyOn(window, 'prompt').and.returnValue('2024-02-01');
      spyOn(component, 'loadBookings');
      component.reschedule(0);
      expect(component.activeBookings[0].date).toBe('2024-02-01');
      expect(component.loadBookings).toHaveBeenCalled();
    });

    it('should not reschedule if prompt returns null', () => {
      const initialDate = '2024-01-01';
      component.activeBookings = [{ doctor: 'Dr. Test', date: initialDate, time: 'TBD', status: 'Confirmed' }];
      spyOn(window, 'prompt').and.returnValue(null);
      spyOn(component, 'loadBookings');
      component.reschedule(0);
      expect(component.activeBookings[0].date).toBe(initialDate);
      expect(component.loadBookings).not.toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    it('should cancel an appointment', () => {
      component.activeBookings = [{ doctor: 'Dr. Test', date: '2024-01-01', time: 'TBD', status: 'Confirmed' }];
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(component, 'loadBookings');
      component.cancel(0);
      expect(component.activeBookings.length).toBe(0);
      expect(component.loadBookings).toHaveBeenCalled();
    });

    it('should not cancel if confirm returns false', () => {
      component.activeBookings = [{ doctor: 'Dr. Test', date: '2024-01-01', time: 'TBD', status: 'Confirmed' }];
      spyOn(window, 'confirm').and.returnValue(false);
      spyOn(component, 'loadBookings');
      component.cancel(0);
      expect(component.activeBookings.length).toBe(1);
      expect(component.loadBookings).not.toHaveBeenCalled();
    });
  });

  it('should move past appointments to pastBookings on loadBookings', () => {
    // Set up localStorage with a past appointment
    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1); // Set date to yesterday
    const pastDateString = pastDate.toISOString().slice(0, 10);
    localStorage.setItem('activeBookings', JSON.stringify([{ doctor: 'Dr. Test', date: pastDateString, time: 'TBD', status: 'Confirmed' }]));
    localStorage.setItem('pastBookings', JSON.stringify([]));

    // Create a new component instance to load the bookings
    fixture = TestBed.createComponent(AppointmentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Assert that the past appointment is now in pastBookings
    expect(component.activeBookings.length).toBe(0);
    expect(component.pastBookings.length).toBe(1);
  });
});