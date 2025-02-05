import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  WORKOUTS_KEY: string = 'workouts';
  workouts: any[] = [];
  filteredWorkouts: any[] = [];

  constructor(private router: Router) {
    this.initializeWorkouts();
  }

  // ✅ Ensure workouts always initialize correctly
  initializeWorkouts() {
    const storedWorkouts = localStorage.getItem(this.WORKOUTS_KEY);

    if (!storedWorkouts || JSON.parse(storedWorkouts).length === 0) {
      this.workouts = [
        { id: uuidv4(), name: 'John Doe', workouttype: 'Running', duration: 30, noofworkouts: 1 },
        { id: uuidv4(), name: 'Jane Smith', workouttype: 'Yoga', duration: 45, noofworkouts: 1 },
        { id: uuidv4(), name: 'Alice Brown', workouttype: 'Cycling', duration: 60, noofworkouts: 1 }
      ];
      this.saveWorkouts(); // ✅ Store default workouts
    } else {
      this.workouts = JSON.parse(storedWorkouts);
    }
  }AddWorkout(name: string, workouttype: string, duration: number) {
    this.loadWorkouts(); 
  
    let existingWorkout = this.workouts.find(workout => workout.name === name);
  
    if (existingWorkout) {
      // Ensure workout type is merged correctly
      if (!existingWorkout.workouttype.includes(workouttype)) {
        existingWorkout.workouttype += `, ${workouttype}`;
      }
  
      // Convert duration to number before adding
      existingWorkout.duration = Number(existingWorkout.duration) + Number(duration);
  
      // Increase number of workouts
      existingWorkout.noofworkouts += 1;
    } else {
      const workout = { 
        id: uuidv4(), 
        name, 
        workouttype, 
        duration: Number(duration),
        noofworkouts: 1 
      };
      this.workouts.unshift(workout); // 🔥 Add to the beginning of the array
    }
  
    this.saveWorkouts();
  
    // 🔹 Store the latest added name in localStorage for welcome message
    localStorage.setItem('latestUser', name);
  }
  
  
  getWorkout(): any[] {
    return JSON.parse(localStorage.getItem(this.WORKOUTS_KEY) || '[]');
  }

  deleteWorkout(id: string) {
    this.workouts = this.getWorkout().filter(workout => workout.id !== id);
    this.saveWorkouts();
  }

  private saveWorkouts() {
    localStorage.setItem(this.WORKOUTS_KEY, JSON.stringify(this.workouts));
  }

  loadWorkouts(): void {
    this.workouts = this.getWorkout().reverse(); // 🔥 Reverse order to show newest first
    this.filteredWorkouts = [...this.workouts]; 
}


  isloggedIn(): boolean {
    return this.getWorkout().length > 0;
  }
}
