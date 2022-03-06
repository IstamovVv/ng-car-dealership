import { Injectable } from "@angular/core";
import { NgElement, WithProperties } from "@angular/elements";
import { ModalComponent } from "../modal.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() {}

  show(message: string, onAccept?: Function, onReject?: Function) {
    const popupEl: NgElement & WithProperties<ModalComponent> = document.createElement('modal-window') as any;

    popupEl.addEventListener('accepted', () => {
      onAccept?.();
      document.body.removeChild(popupEl);
    });

    popupEl.addEventListener('rejected', () => {
      onReject?.();
      document.body.removeChild(popupEl);
    });

    popupEl.message = message;
    document.body.appendChild(popupEl);
  }
}
