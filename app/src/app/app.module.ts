import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatModule } from './appModules/mat/mat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { UserCardComponent } from './components/user-card/user-card.component';
// import {provideNativeDateAdapter} from '@angular/material/core';
import { AttendanceComponent } from './components/attendance/attendance.component';
import {MatNativeDateModule} from '@angular/material/core';
import { UsersModule } from './components/users/users.module';
import { DatePipe } from '@angular/common';
import { CalenderGridComponent } from './components/calender-grid/calender-grid.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthFormComponent,
    ProfileComponent,
    HomeComponent,
    UserCardComponent,
    AttendanceComponent,
    UserCardComponent,
    CalenderGridComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatNativeDateModule,UsersModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
