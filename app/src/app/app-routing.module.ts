import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
{
  path:'profile',
  component:ProfileComponent,
  canActivate:[authGuard]

},
{
  path:'login',
  component:AuthFormComponent
},
{
  path:'signup',
  component:AuthFormComponent
},
{
  path:'attendance',
  component:AttendanceComponent,
  canActivate:[authGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
