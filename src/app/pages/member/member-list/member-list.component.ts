import { Component, OnInit } from '@angular/core';
import { Member } from '../../../models/member';
import { CommonModule } from '@angular/common';
import { MemberService } from '../../../services/member.service';
import { PaginationComponent } from '../../../shared/pagination/pagination.component';
@Component({
  selector: 'app-member-list',
  imports: [CommonModule, PaginationComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];
  paginatedMembers: Member[] = [];

  currentPage = 1;
  itemPerPage = 10;
  totalPages = 0;

  constructor(private memberService: MemberService) {}

  ngOnInit() {
    this.getAllMembers();
  }

  getAllMembers(): void {
    this.memberService.getAllMembers().subscribe({
      next: (data) => {
        this.members = data;
        this.totalPages = Math.ceil(this.members.length / this.itemPerPage);
        this.updatePage();
      },
      error: (err) => {
        console.log('Error Fetching Members', err);
      },
    });
  }

  //! Pagination
  updatePage(): void {
    const start = (this.currentPage - 1) * this.itemPerPage;
    this.paginatedMembers = this.members.slice(start, start + this.itemPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePage();
  }
}
