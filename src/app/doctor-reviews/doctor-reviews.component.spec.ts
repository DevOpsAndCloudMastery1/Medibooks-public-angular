import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { DoctorReviewsComponent } from './doctor-reviews.component';

describe('DoctorReviewsComponent', () => {
  let component: DoctorReviewsComponent;
  let fixture: ComponentFixture<DoctorReviewsComponent>;
  let router: Router;
  let localStorageMock: any;

  beforeEach(async () => {
    // Mock localStorage
    localStorageMock = {
      getItem: (key: string): string | null => {
        if (key === 'doctorReviews') {
          return JSON.stringify([{ doctor: 'Dr. John Smith', rating: '5', text: 'Good', date: '2024-01-01' }]);
        }
        return null;
      },
      setItem: (key: string, value: string) => {
        (localStorageMock as any).store[key] = String(value); //Store in mock
      },
      removeItem: (key: string) => {
        delete (localStorageMock as any).store[key];
      },
      clear: () => {
        (localStorageMock as any).store = {}; // Clear the store
      },
      store: {}  // A store to store the mock data
    };

    spyOn(localStorageMock, 'getItem').and.callThrough();
    spyOn(localStorageMock, 'setItem').and.callThrough();
    spyOn(localStorageMock, 'removeItem').and.callThrough();
    spyOn(localStorageMock, 'clear').and.callThrough();

    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
    });

  
    await TestBed.configureTestingModule({
      imports: [DoctorReviewsComponent, FormsModule, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorReviewsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load reviews on init', () => {
    component.ngOnInit();
    expect(localStorageMock.getItem).toHaveBeenCalledWith('doctorReviews');
    expect(component.reviews.length).toBeGreaterThan(0);
  });

  it('should load reviews for the selected doctor', () => {
    component.selectedDoctor = 'Dr. Emma Davis';
    component.loadReviews();
    expect(component.reviews).toEqual([]);
  });

  it('should submit a review and update the review list', () => {
    component.selectedDoctor = 'Dr. John Smith';
    component.newReview = { rating: '4', text: 'Great doctor!' };
    component.submitReview();
    expect(localStorageMock.setItem).toHaveBeenCalled();

     // You need to fetch the updated data from localStorageMock to verify
     const storedReviews = JSON.parse(localStorageMock.getItem('doctorReviews') || '[]');
     expect(storedReviews).toContain({
      doctor: 'Dr. John Smith',
      rating: '4',
      text: 'Great doctor!',
      date: new Date().toLocaleDateString(),
    });
    expect(component.newReview.text).toEqual('');
  });

  it('should navigate to home page', () => {
    spyOn(router, 'navigate');
    component.goToHome();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should show an alert if the review text is empty', () => {
    spyOn(window, 'alert');
    component.newReview.text = '   ';
    component.submitReview();
    expect(window.alert).toHaveBeenCalledWith('Please enter a review before submitting.');
  });
});