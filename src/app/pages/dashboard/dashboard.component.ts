import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  username: string | null = '';
  currentDate = new Date();

  totalUsers = 0;
  totalMembers = 0;
  totalBooks = 0;
  totalCategories = 0;

  constructor(private dashboardService: DashboardService) {}
    
  ngOnInit() {
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) this.username = storedUsername;
  }
}
