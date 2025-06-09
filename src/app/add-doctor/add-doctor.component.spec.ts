import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddDoctorComponent } from './add-doctor.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AddDoctorComponent', () => {
  let component: AddDoctorComponent;
  let fixture: ComponentFixture<AddDoctorComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDoctorComponent, FormsModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDoctorComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should post doctor data and reset the form', () => {
    const doctorData = {
      name: 'Dr. Test',
      img: 'test.jpg',
      specialization: 'Test',
      experience: '10 years',
      location: 'Test Location',
      description: 'Test Description'
    };

    component.newDoctor = { ...doctorData };
    component.addDoctor();

    const req = httpMock.expectOne('http://localhost:3000/api/doctors');
    expect(req.request.method).toBe('POST');
    req.flush(doctorData);

    expect(component.submitted).toBeTrue();
    expect(component.newDoctor.name).toBe('');
    httpMock.verify();
  });

  afterEach(() => {
    httpMock.verify();
  });
});
