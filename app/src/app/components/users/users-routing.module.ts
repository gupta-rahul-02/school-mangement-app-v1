import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { StudentsComponent } from './students/students.component';
import { TeachersComponent } from './teachers/teachers.component';
import { AllComponent } from './all/all.component';

const routes: Routes = [
  {
    path:'',
    component:UsersComponent,
    children:[
      {
        path:'all',
        component:AllComponent
      },
      {
        path:'students',
        component:StudentsComponent
      },
      {
        path:'teachers',
        component:TeachersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
