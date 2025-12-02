import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  imageUrl: string = 'http://localhost:5000/uploads/userImages/defaultUser.png';
  username: string | null = '';
  role: string | null = '';

  ngOnInit() {
    const storedImage = localStorage.getItem('imageUrl');
    const storedUsername = localStorage.getItem('username');
    const storeUserRole = localStorage.getItem('role');

    if (storedImage) this.imageUrl = storedImage;
    if (storedUsername) this.username = storedUsername;
    if (storeUserRole) this.role = storeUserRole;
  }
}
