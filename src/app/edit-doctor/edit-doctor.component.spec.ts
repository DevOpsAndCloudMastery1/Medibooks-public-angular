import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { EditDoctorComponent } from './edit-doctor.component';
import { of } from 'rxjs';

describe('EditDoctorComponent', () => {
  let component: EditDoctorComponent;
  let fixture: ComponentFixture<EditDoctorComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditDoctorComponent, // ✅ Standalone component
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '1' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EditDoctorComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should fetch doctor on init', () => {
    const doctorData = {
      id: '1',
      name: 'Dr. Test',
      specialization: 'Cardiology',
      experience: '10 years',
      location: 'City A',
      description: 'Specialist',
      img: 'img.jpg'
    };

    const req = httpMock.expectOne('http://192.168.0.63:3000/api/doctors/1');
    expect(req.request.method).toBe('GET');
    req.flush(doctorData);

    expect(component.doctor.name).toBe('Dr. Test');
  });

  it('should update doctor details on form submit', () => {
    component.doctorId = '1';
    component.doctor = {
      id: '1',
      name: 'Old Name',
      specialization: '',
      experience: '',
      location: '',
      description: '',
      img: ''
    };

    component.doctor.name = 'Updated Name';
    component.updateDoctor();

    const req = httpMock.expectOne('http://192.168.0.63:3000/api/doctors/1');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body.name).toBe('Updated Name');
    req.flush({ message: 'Updated' });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
