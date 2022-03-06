import { ApplicationRef, DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from "@angular/elements";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { AngularMaterialSharedModule } from "./modules/angular-material-shared/angular-material-shared.module";
import { ServiceLocator } from "./services/utils/locator.service";
import { ModelsListComponent } from "./components/models-list/models-list.component";
import { AddModelComponent } from "./components/add-model/add-model.component";
import { ModelViewComponent } from "./components/model-view/model-view.component";
import { ModalComponent } from "./components/utils/modal/modal.component";
import { KeysPipe } from "../app/keys.pipe";
import { AdminRoutingModule } from "./admin-routing.module";
import { CommonModule } from "@angular/common";
import { AdminComponent } from './admin.component';

@NgModule({
  declarations: [
    KeysPipe,
    ModelViewComponent,
    ModelsListComponent,
    AddModelComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularMaterialSharedModule,
  ],
})
export class AdminModule implements DoBootstrap {
  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector;
  }

  ngDoBootstrap(appRef: ApplicationRef) {
    appRef.bootstrap(AdminComponent);

    const ModalElement = createCustomElement(ModalComponent, { injector: this.injector });
    customElements.define('modal-window', ModalElement);
  }
}
