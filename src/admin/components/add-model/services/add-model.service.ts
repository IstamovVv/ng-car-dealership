import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AddModelService {
  toFormGroup(fields: string[]) {
    const group: any = {};

    fields.forEach(field => {
      group[field] = new FormControl();
    })

    return new FormGroup(group);
  }
}
