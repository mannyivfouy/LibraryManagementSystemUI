import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-user-list',
  imports: [CommonModule, PaginationComponent, FormsModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  paginatedUsers: User[] = [];

  currentPage = 1;
  itemPerPage = 10;
  totalPages = 0;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.totalPages = Math.ceil(this.users.length / this.itemPerPage);
        this.updatePage();
      },
      error: (err) => {
        console.log('Error Fectching Users', err);
      },
    });
  }

  //! Pagination
  updatePage(): void {
    const start = (this.currentPage - 1) * this.itemPerPage;
    this.paginatedUsers = this.users.slice(start, start + this.itemPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }
}
