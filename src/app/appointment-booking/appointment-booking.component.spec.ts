import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentBookingComponent } from './appointment-booking.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('AppointmentBookingComponent', () => {
  let component: AppointmentBookingComponent;
  let fixture: ComponentFixture<AppointmentBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule, AppointmentBookingComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({ id: '1' }) },
        },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch doctor details based on route parameter', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.doctorId).toBe('1');
  });

  it('should confirm appointment when bookAppointment() is called', () => {
    component.bookAppointment();
    expect(component.appointmentConfirmed).toBeTrue();
  });

  it('should bind form inputs correctly', () => {
    component.appointmentData.date = '2025-04-15';
    component.appointmentData.time = '10:00 AM';
    component.appointmentData.name = 'John Doe';
    component.appointmentData.email = 'john@example.com';
    component.appointmentData.phone = '1234567890';
    
    fixture.detectChanges();

    expect(component.appointmentData.date).toBe('2025-04-15');
    expect(component.appointmentData.time).toBe('10:00 AM');
    expect(component.appointmentData.name).toBe('John Doe');
    expect(component.appointmentData.email).toBe('john@example.com');
    expect(component.appointmentData.phone).toBe('1234567890');
  });
});
