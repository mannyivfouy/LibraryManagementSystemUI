import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../models/user';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  showPassword = false;
  userForm!: FormGroup;
  _id: string | null = null;
  isEdit = false;
  selectAvatarFile: File | null = null;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      fullname: ['', Validators.required],
      username: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      role: ['', Validators.required],
      password: [''],
      avatar: [''],
    });

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          if (!id) return of(null);
          this.isEdit = true;
          this._id = id;
          this.loading = true;
          return this.userService.getUserByID(id);
        })
      )
      .subscribe({
        next: (user: User | null) => {
          this.loading = false;
          if (user) this.patchForm(user);
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.message || 'Failed to load user';
          console.error('Get User Failed', err);
        },
      });
    if (!this.isEdit) {
      this.userForm.get('password')?.setValidators([Validators.required]);
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  get fullname() {
    return this.userForm.get('fullname');
  }

  get username() {
    return this.userForm.get('username');
  }

  get gender() {
    return this.userForm.get('gender');
  }

  get address() {
    return this.userForm.get('address');
  }

  get phoneNumber() {
    return this.userForm.get('phoneNumber');
  }

  get role() {
    return this.userForm.get('role');
  }

  get password() {
    return this.userForm.get('password');
  }

  get avatar() {
    return this.userForm.get('avatar');
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  patchForm(user: User) {
    this.userForm.patchValue({
      fullname: user.fullname ?? '',
      username: user.username ?? '',
      gender: user.gender ?? '',
      address: user.address ?? '',
      phoneNumber: user.phoneNumber ?? '',
      role: user.roleID ?? '',
      avatar: user.imageUrl ?? '',
    });

    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
  }

  onCancel() {
    this.router.navigate(['/user']);
  }

  submitUserForm(){

  }
}
