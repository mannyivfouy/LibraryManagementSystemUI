import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserFormComponent } from './pages/user/user-form/user-form.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ProductFormComponent } from './pages/product/product-form/product-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [], //! Noted
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            component: UserListComponent,
          },
          {
            path: 'createUser',
            component: UserFormComponent,
          },
          {
            path: 'editUser/:id',
            component: UserFormComponent,
          },
        ],
      },
      {
        path: 'product',
        children: [
          {
            path: '',
            component: ProductListComponent,
          },
          {
            path: 'createProduct',
            component: ProductFormComponent,
          },
          {
            path: 'editProduct/:id',
            component: ProductFormComponent,
          },
        ],
      },
      
    ],
  },
];
