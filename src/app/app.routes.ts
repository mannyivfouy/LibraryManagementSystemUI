import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { UserFormComponent } from './pages/user/user-form/user-form.component';
import { ProductListComponent } from './pages/product/product-list/product-list.component';
import { ProductFormComponent } from './pages/product/product-form/product-form.component';
import { CategoryListComponent } from './pages/category/category-list/category-list.component';
import { CategoryFormComponent } from './pages/category/category-form/category-form.component';
import { MemberListComponent } from './pages/member/member-list/member-list.component';
import { MemberFormComponent } from './pages/member/member-form/member-form.component';
import { StockListComponent } from './pages/stock/stock-list/stock-list.component';
import { StockFormComponent } from './pages/stock/stock-form/stock-form.component';
import { ReportComponent } from './pages/report/report.component';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { NotAuthorizedComponent } from './pages/not-authorized/not-authorized.component';

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
    // canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [roleGuard],
        data: { roles: ['Administrator', 'Librarian', 'Stock Controller'] },
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            canActivate: [roleGuard],
            data: { roles: ['Administrator'] },
            component: UserListComponent,
          },
          {
            path: 'createUser',
            canActivate: [roleGuard],
            data: { roles: ['Administrator', 'Librarian', 'Stock Controller'] },
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
        canActivate: [roleGuard],
        data: { roles: ['Administrator', 'Librarian', 'Stock Controller'] },
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
      {
        path: 'category',
        canActivate: [roleGuard],
        data: { roles: ['Administrator', 'Librarian', 'Stock Controller'] },
        children: [
          {
            path: '',
            component: CategoryListComponent,
          },
          {
            path: 'createCategory',
            component: CategoryFormComponent,
          },
          {
            path: 'editCategory/:id',
            component: CategoryFormComponent,
          },
        ],
      },
      {
        path: 'member',
        canActivate: [roleGuard],
        data: { roles: ['Administrator', 'Librarian', 'Stock Controller'] },
        children: [
          {
            path: '',
            component: MemberListComponent,
          },
          {
            path: 'createMember',
            component: MemberFormComponent,
          },
          {
            path: 'editMember/:id',
            component: MemberFormComponent,
          },
        ],
      },
      {
        path: 'stock',
        canActivate: [roleGuard],
        data: { roles: ['Administrator', 'Librarian', 'Stock Controller'] },
        children: [
          {
            path: '',
            component: StockListComponent,
          },
          {
            path: 'createStock',
            component: StockFormComponent,
          },
          {
            path: 'editStock/:id',
            component: StockFormComponent,
          },
        ],
      },
      {
        path: 'report',
        component: ReportComponent,
        canActivate: [roleGuard],
        data: { roles: ['Administrator', 'Librarian', 'Stock Controller'] },
      },
    ],
  },
  {
    path: 'not-authorized',
    component: NotAuthorizedComponent,
  },
];
