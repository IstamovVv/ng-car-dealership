import { Injectable } from '@angular/core';
import { NgElement, WithProperties } from "@angular/elements";
import { ModalComponent } from "../modal/modal.component";
import { Subject } from "rxjs";

export enum ModalResponse {
  Accepted,
  Rejected
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() {}

  showAsElement(message: string) {
    const popupEl: NgElement & WithProperties<ModalComponent> = document.createElement('modal-window') as any;
    const modalSubject = new Subject<ModalResponse>();

    popupEl.addEventListener('accepted', () => {
      modalSubject.next(ModalResponse.Accepted);
      document.body.removeChild(popupEl);
    });

    popupEl.addEventListener('rejected', () => {
      modalSubject.next(ModalResponse.Rejected);
      document.body.removeChild(popupEl);
    });

    popupEl.message = message;
    document.body.appendChild(popupEl);

    return modalSubject;
  }
}
