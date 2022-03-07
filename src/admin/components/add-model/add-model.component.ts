import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup } from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Subscription } from "rxjs";
import { AddModelService } from "./services/add-model.service";
import { AdminService } from "../../services/admin.service";
import { ModalService } from "../utils/modal/services/modal.service";
import { Registered } from "../../services/registered.service";

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.scss']
})
export class AddModelComponent {

  modelForm = new FormGroup({});

  registered!: Registered<any>;

  fields: string[] = [];

  private routerSubscription!: Subscription;

  constructor(public modal: ModalService,
              private route: ActivatedRoute,
              private router: Router,
              private adminService: AdminService,
              private addModelService: AddModelService) { }

  ngAfterContentInit() {
    this.routerSubscription = this.route.params.subscribe(params => {
      this.registered = this.adminService.getRegistered(params['modelName']);

      if (!this.registered) this.router.navigate(['/admin']);

      this.fields     = this.registered.fields.slice();
      this.modelForm  = this.addModelService.toFormGroup(this.fields);
    })
  }

  onSubmit() {
    this.modal.show('Are you sure you want to add this object?', () => {
      this.registered.service.create(this.modelForm.getRawValue(), {
        onSuccess: () => this.modal.show('Success!'),
        onFailure: (error: HttpErrorResponse) => {
          this.modal.show(`Error: ${error.error.error}`)
          console.log(error)
        },
      })
    })
  }
}
