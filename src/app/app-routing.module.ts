import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/components/login/login.component";
import { AuthGuard } from "./auth/guards/auth.guard";
import { MainComponent } from "./main/main.component";
import { PermissionsGuard } from "./auth/guards/permissions.guard";
import { Roles } from "./auth/models/roles";
import { ProfileComponent } from "./profile/profile.component";
import { PaymentPageComponent } from "./payment-page/payment-page.component";
import { RegistrationComponent } from "./auth/components/registration/registration.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard, PermissionsGuard],
    data: {
      roles: [Roles.User, Roles.Admin]
    }
  },
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'payment',
    component: PaymentPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin',
    canActivate: [AuthGuard, PermissionsGuard],
    data: {
      roles: [Roles.Admin]
    },
    loadChildren: () => import('../admin/admin.module').then(m => m.AdminModule),
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
