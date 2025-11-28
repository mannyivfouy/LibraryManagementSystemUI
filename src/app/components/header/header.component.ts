import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  imageUrl: string = 'http://localhost:5000/uploads/userImages/defaultUser.png';
  username: string | null = '';

  ngOnInit() {
    const storedImage = localStorage.getItem('imageUrl');
    const storedUsername = localStorage.getItem('username');

    if (storedImage) this.imageUrl = storedImage;
    if (storedUsername) this.username = storedUsername;
  }
}
