import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { AuthGuard } from "./auth/guards/auth.guard";
import { AuthService } from "./auth/services/auth.service";
import { TokenInterceptor } from "./interceptors/token.interceptor";
import { AdminComponent } from './admin/admin.component';
import { MatListModule } from "@angular/material/list";
import { ModelViewComponent } from './admin/model-view/model-view.component';

import { ServiceLocator } from "./services/locator.service";
import { ModelsListComponent } from './admin/models-list/models-list.component';
import { KeysPipe } from "./keys.pipe";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ModelViewComponent,
    ModelsListComponent,
    KeysPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatTableModule
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
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }
}
