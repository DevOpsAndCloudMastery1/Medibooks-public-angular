import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DoctorListComponent } from './doctor-list.component';

describe('DoctorListComponent', () => {
  let component: DoctorListComponent;
  let fixture: ComponentFixture<DoctorListComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DoctorListComponent, // ✅ Standalone component goes in imports
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DoctorListComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should fetch doctors on init', () => {
    const mockDoctors = [
      {
        id: '1',
        name: 'Dr. A',
        specialization: 'Cardiology',
        experience: '10 years',
        location: 'City A',
        description: 'Expert in heart surgery',
        img: 'img1.jpg'
      }
    ];

    const req = httpMock.expectOne('http://localhost:3000/api/doctors');
    expect(req.request.method).toBe('GET');
    req.flush(mockDoctors);

    expect(component.doctors.length).toBe(1);
    expect(component.doctors[0].name).toBe('Dr. A');
  });

  it('should delete doctor from list', () => {
    component.doctors = [
      { id: '1', name: 'Dr. A' },
      { id: '2', name: 'Dr. B' }
    ];

    component.deleteDoctor('1');

    const req = httpMock.expectOne('http://localhost:3000/api/doctors/1');
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Deleted' });

    expect(component.doctors.length).toBe(1);
    expect(component.doctors[0].id).toBe('2');
  });

  afterEach(() => {
    httpMock.verify();
  });
});
