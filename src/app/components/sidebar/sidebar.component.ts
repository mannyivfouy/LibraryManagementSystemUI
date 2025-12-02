import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  role: string | null = '';

  constructor(private router: Router) {
    this.role = localStorage.getItem('role');
  }

  isAdmin(): boolean {
    return this.role === 'Administrator';
  }

  logout() {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('imageUrl');

    this.router.navigate(['/login']);
  }
}
