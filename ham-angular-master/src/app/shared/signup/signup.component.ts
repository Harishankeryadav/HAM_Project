import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { UserService } from '../../service/user/user.service';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  imports: [CommonModule,FormsModule,RouterModule,ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup; // Reactive Form Group

  constructor(
    private fb: FormBuilder,
    private service: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Create reactive form with default value for role
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      role: ['Patient', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  addUser() {
    if (this.signupForm.invalid) {
      return;
    }
    const user: User = this.signupForm.value;
    this.service.addUser(user).subscribe(
      data => {
        this.toastr.success('Sign-up successful!');
        this.router.navigate(['login']);
      },
      error => {
        this.toastr.error(error.error, 'Sign-up Failed');
      }
    );
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
