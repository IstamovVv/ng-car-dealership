import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { AuthService } from "./auth/services/auth.service";
import { AuthGuard } from "./auth/guards/auth.guard";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AdminModule } from "../admin/admin.module";
import { LoginComponent } from './auth/components/login/login.component';
import { AngularMaterialSharedModule } from "./modules/angular-material-shared/angular-material-shared.module";
import { ReactiveFormsModule } from "@angular/forms";
import { RegistrationComponent } from './auth/components/registration/registration.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    AngularMaterialSharedModule,
    ReactiveFormsModule,
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
})
export class AppModule {
  constructor() {}
}
