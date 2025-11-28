import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { NotAuthorizedComponent } from '../../pages/not-authorized/not-authorized.component';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../services/modal.service';
@Component({
  selector: 'app-main-layout',
  imports: [
    SidebarComponent,
    HeaderComponent,
    RouterOutlet,
    NotAuthorizedComponent,
    CommonModule,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  constructor(public modalService: ModalService) {}
}
