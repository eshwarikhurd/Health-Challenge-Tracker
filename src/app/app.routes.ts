import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { AddWorkoutComponent } from './pages/add-workout/add-workout.component';
import { authGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [{
    path: '',
    pathMatch: 'full',
    redirectTo: 'add-workout'
}, {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard]
}, {
    path: 'details/:id',
    component: DetailsComponent,
    canActivate: [authGuard]
}, {
    path: 'add-workout',
    component: AddWorkoutComponent
},
{
    path: '**',
    redirectTo: 'add-workout'
}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }