import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { Router } from '@angular/router';

describe('UserService', () => {
  let service: UserService;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    router = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [UserService, { provide: Router, useValue: router }],
    });
    service = TestBed.inject(UserService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a workout', () => {
    service.AddWorkout('John', 'Running', 30);
    expect(service.workouts.length).toBe(1);
    expect(service.workouts[0].name).toBe('John');
  });

  it('should retrieve a workout from local storage', () => {
    service.AddWorkout('John', 'Running', 30);
    const storedWorkouts = service.getWorkout();
    expect(storedWorkouts[0].name).toBe('John');
  });

  it('should delete a workout and navigate', () => {
    service.AddWorkout('John', 'Running', 30);
    service.deleteWorkout(service.workouts[0].id);
    expect(localStorage.getItem(service.WORKOUTS_key)).toBeNull();
    expect(router.navigate).toHaveBeenCalledWith(['/add-workout']);
  });

  it('should return true if a user is logged in', () => {
    service.AddWorkout('John', 'Running', 30);
    expect(service.isloggedIn()).toBeTrue();
  });

  it('should return false if no user is logged in', () => {
    expect(service.isloggedIn()).toBeFalse();
  });
});
