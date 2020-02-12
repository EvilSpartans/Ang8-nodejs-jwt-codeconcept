import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobAddFormComponent } from './job-add-form/job-add-form.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './register/register.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  { path: '', component: HomeComponent,  data: { animation: 'isRight' }},
  {path: 'jobs', component: JobListComponent,  data: { animation: 'isLeft' }},
  {path: 'jobs/add', component: JobAddFormComponent},
  {path: 'jobs/:id', component: JobDetailsComponent},
  {path: 'login', component: AuthenticationComponent, data: { animation: '' }},
  {path: 'register', component: RegisterComponent, data: { animation: 'isMiddle' }},
  {path: 'profile', component: UserProfileComponent, data: { animation: 'isTop' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled'} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
