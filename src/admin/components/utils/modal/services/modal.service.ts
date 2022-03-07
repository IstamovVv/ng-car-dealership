import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from "@angular/core";
import { ModalComponent } from "../modal.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor(private injector: Injector,
              private applicationRef: ApplicationRef,
              private componentFactoryResolver: ComponentFactoryResolver) {}

  show(message: string, onAccept?: Function, onReject?: Function) {
    const modal = document.createElement('modal-window');

    const factory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const modalComponentRef = factory.create(this.injector, [], modal);

    this.applicationRef.attachView(modalComponentRef.hostView);

    modalComponentRef.instance.accepted.subscribe(() => {
      onAccept?.();
      document.body.removeChild(modal);
      this.applicationRef.detachView(modalComponentRef.hostView);
    });

    modalComponentRef.instance.rejected.subscribe(() => {
      onReject?.();
      document.body.removeChild(modal);
      this.applicationRef.detachView(modalComponentRef.hostView);
    });

    modalComponentRef.instance.message = message;
    document.body.appendChild(modal);
  }
}
