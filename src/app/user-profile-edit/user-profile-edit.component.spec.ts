import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { UserProfileEditComponent } from './user-profile-edit.component';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('UserProfileEditComponent', () => {
  let component: UserProfileEditComponent;
  let fixture: ComponentFixture<UserProfileEditComponent>;
  let router: Router;
  let httpClient: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserProfileEditComponent, HttpClientTestingModule, RouterTestingModule, FormsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserProfileEditComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    httpClient = TestBed.inject(HttpClient);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user profile on init', () => {
    const mockProfile = { name: 'Test User', email: 'test@example.com', phone: '123-456-7890' };
    spyOn(httpClient, 'get').and.returnValue(of(mockProfile));
    component.ngOnInit();
    expect(component.userProfile).toEqual(mockProfile);
  });

  it('should navigate to user profile on cancel', () => {
    spyOn(router, 'navigate');
    component.onCancel();
    expect(router.navigate).toHaveBeenCalledWith(['/user-profile']);
  });

  it('should update user profile and navigate on submit', () => {
    spyOn(httpClient, 'put').and.returnValue(of(null));
    spyOn(router, 'navigate');
    component.onSubmit();
    expect(httpClient.put).toHaveBeenCalledWith('/api/user/profile', component.userProfile);
    expect(router.navigate).toHaveBeenCalledWith(['/user-profile']);
  });
});
