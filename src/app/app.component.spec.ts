import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWorkoutComponent } from './pages/add-workout/add-workout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    userService = jasmine.createSpyObj('UserService', ['AddWorkout']);
    router = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddWorkoutComponent],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.accountform).toBeDefined();
  });

  it('should not call AddWorkout if form is invalid', () => {
    component.accountform.patchValue({ name: '', workouttype: '', duration: '' });
    component.AddWorkout();
    expect(userService.AddWorkout).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should call AddWorkout and navigate on valid form submission', () => {
    component.accountform.patchValue({ name: 'John', workouttype: 'Running', duration: 30 });
    component.AddWorkout();
    expect(userService.AddWorkout).toHaveBeenCalledWith('John', 'Running', 30);
    expect(router.navigate).toHaveBeenCalledWith(['/home'], { state: { newWorkout: { username: 'John', workouttype: 'Running', duration: '30' } } });
  });
});
