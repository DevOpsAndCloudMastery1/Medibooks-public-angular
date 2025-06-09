import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { DoctorSearchComponent } from './doctor-search.component';

describe('DoctorSearchComponent', () => {
  let component: DoctorSearchComponent;
  let fixture: ComponentFixture<DoctorSearchComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, RouterTestingModule, HttpClientTestingModule,DoctorSearchComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorSearchComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load doctors on init', () => {
    const mockDoctors = {
      doctors: [
        { id: 1, name: 'Dr. Test', specialization: 'Test', img: 'test.jpg' }
      ]
    };

    // Simulate HTTP request
    const req = httpTestingController.expectOne('data/doctors.json');
    expect(req.request.method).toEqual('GET');
    req.flush(mockDoctors);

    // Expect the doctors list to be populated
    expect(component.doctors.length).toBe(1);
    expect(component.filteredDoctors.length).toBe(1);
  });

  it('should filter doctors based on search term', () => {
    component.doctors = [
      { id: 1, name: 'Dr. John Smith', specialization: 'Cardiologist', img: 'assets/images/doctor1.jpg' },
      { id: 2, name: 'Dr. Emma Davis', specialization: 'Neurologist', img: 'assets/images/doctor2.jpg' }
    ];
    
    component.searchTerm = 'John'; // Ensuring a valid match
    component.filterDoctors();

    expect(component.filteredDoctors.length).toBe(1);
    expect(component.filteredDoctors[0].name).toBe('Dr. John Smith');
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure there are no pending requests
  });
});
