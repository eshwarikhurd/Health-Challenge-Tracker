import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';


@Component({
  selector: 'app-add-workout',
  standalone: true,
  imports: [ReactiveFormsModule, DropdownComponent],
  templateUrl: './add-workout.component.html',
  styleUrl: './add-workout.component.css'
})
export class AddWorkoutComponent {
  accountform: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    workouttype: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private router:Router) {}

  AddWorkout() {
    console.log('Add workout function called');
    if (this.accountform.valid) {
      const username = this.accountform.get('name')?.value
      const workouttype = this.accountform.get('workouttype')?.value;
      const duration = this.accountform.get('duration')?.value;

      this.userService.AddWorkout(username, workouttype, duration);
      console.log('Workout added successfully');
      this.router.navigate(['/home'], {state: {newWorkout: {username, workouttype, duration}}});
      console.log('home working successfully');
  }
  else {
    alert('Please fill all the fields');
  }
   
  
}
}
