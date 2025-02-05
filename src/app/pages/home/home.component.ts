import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserService } from '../../services/user.service';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxPaginationModule, PaginationComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  workouts: any[] = []; 
  filteredWorkouts: any[] = [];
  searchText: string = ''; 
  filterText: string = ''; 
  p: number = 1;

  constructor(public userService: UserService) {}

  latestUser: string = 'User';  // Default value


  ngOnInit(): void {
    this.latestUser = localStorage.getItem('latestUser') || 'User';
    this.loadWorkouts();
  }
  
  

  loadWorkouts(): void {
    this.workouts = this.userService.getWorkout().reverse(); // 🔥 Reverse order to show newest first
    this.filteredWorkouts = [...this.workouts]; 
}


  applyFilters(): void {
    this.filteredWorkouts = this.workouts.filter(workout =>
      workout.name.toLowerCase().includes(this.searchText.toLowerCase()) &&
      workout.workouttype.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  deleteWorkout(id: string): void {
    this.userService.deleteWorkout(id);
    window.location.reload(); // ⚠️ Full page refresh (not recommended)
  }
  
}
