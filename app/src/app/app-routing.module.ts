import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AttendanceComponent } from './components/attendance/attendance.component';

const routes: Routes = [
{
  path:'profile',
  component:ProfileComponent
},
{
  path:'',
  component:AuthFormComponent
},
{
  path:'attendance',
  component:AttendanceComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
