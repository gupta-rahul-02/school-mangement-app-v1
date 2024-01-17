import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';
import { AllComponent } from './all/all.component';

const routes: Routes = [
  {
    path:'',
    component:UsersComponent,
    children:[
      {
        path:':all',
        component:AllComponent
      },
      // {
      //   path:':all/students',
      //   component:StudentsComponent
      // },
      // {
      //   path:':all/teachers',
      //   component:TeachersComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
