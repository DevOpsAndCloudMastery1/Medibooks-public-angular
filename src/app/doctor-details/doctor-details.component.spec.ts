import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DoctorDetailsComponent } from './doctor-details.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('DoctorDetailsComponent', () => {
  let component: DoctorDetailsComponent;
  let fixture: ComponentFixture<DoctorDetailsComponent>;
  let httpTestingController: HttpTestingController;

  const mockActivatedRoute = {
    params: of({ id: '1' })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule, RouterModule, DoctorDetailsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorDetailsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch doctor details on init', () => {
    const mockDoctorData = {
      id: '1',
      name: 'Dr. Test',
      img: 'test.jpg',
      specialization: 'Test',
      experience: '10 years',
      location: 'Test Location',
      description: 'Test Description'
    };

    const req = httpTestingController.expectOne('/api/doctors/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockDoctorData);

    expect(component.doctor).toBeDefined();
    expect(component.doctor?.name).toEqual('Dr. Test');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});

