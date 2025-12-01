import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  username: string | null = '';
  currentDate = new Date();
  ngOnInit() {
    const storedUsername = localStorage.getItem('username');

    if (storedUsername) this.username = storedUsername;
  }
}
