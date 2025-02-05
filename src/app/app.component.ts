import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AddWorkoutComponent } from './pages/add-workout/add-workout.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'health-app';
}
@NgModule({
  declarations: [
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'add-workout',
        loadComponent: () => import('./pages/add-workout/add-workout.component').then(m => m.AddWorkoutComponent)
      }
    ]),
    DropdownComponent
  ],
   
  providers: [],
  
})
export class AppModule { }