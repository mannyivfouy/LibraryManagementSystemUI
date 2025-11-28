import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { ModalService } from '../services/modal.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const userRole = localStorage.getItem('role');

  const allowedRoles = route.data['roles'] as string[] | undefined;

  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  if (userRole && allowedRoles.includes(userRole)) {
    return true;
  }

  const modalService = inject(ModalService);
  modalService.showAccessDenied();
  return false;
};
