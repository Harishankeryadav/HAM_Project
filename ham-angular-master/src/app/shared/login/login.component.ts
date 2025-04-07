import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserData, userLogin } from '../model/user.model';
import { UserService } from '../../service/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  userdata?: UserData;

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  loginUser() {
    if (this.loginForm.invalid) {
      return;
    }
    const credentials = this.loginForm.value as userLogin;
    this.service.loginUser(credentials).subscribe(
      data => {
        localStorage.setItem("loggedInUser", JSON.stringify(data));
        this.userdata = data;
        this.toastr.success('User successfully logged in', 'Success', { timeOut: 3000 });
        if (this.userdata.role === "Doctor") {
          this.router.navigate(['doctor']);
        } else {
          this.router.navigate(['patient']);
        }
      },
      error => {
        this.toastr.error(error.error, 'Login Failed', { timeOut: 3000 });
      }
    );
  }
}