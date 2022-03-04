import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdminService } from "../services/admin.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { ModalService } from "../../common/services/modal.service";
import { ModalComponent } from "../../common/modal/modal.component";
import { createCustomElement } from "@angular/elements";
import { Registered } from "../services/registered.service";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: 'app-model-view',
  templateUrl: './model-view.component.html',
  styleUrls: ['./model-view.component.scss']
})
export class ModelViewComponent implements OnInit, OnDestroy {
  modelName!: string;
  registered!: Registered<any>;

  objects?: any[];
  fields?: string[];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private routerSubscription!: Subscription;

  constructor(public modal: ModalService,
              private adminService: AdminService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngAfterViewInit() {
    this.routerSubscription = this.route.params.subscribe(params => {
      this.registered = this.adminService.getRegistered(params['modelName']);

      if (!this.registered) this.router.navigate(['/admin']);

      this.fields = this.registered.fields.slice();
      this.fields.push('actions');

      this.loadObjects();
    })
  }

  loadObjects() {
    this.registered.service.get(0, 10, {
      onSuccess: (objects: any[]) => {
        this.objects = objects;
        this.isLoadingResults = false;
      }
    });
  }

  handleDelete(element: any) {
    this.modal.show('Are you sure you want to delete this object?', () => {
      // this.registered.service.delete(element.id).subscribe((response: HttpResponse<null>) => {
      //   if (response.ok) {
      //     this.loadObjects();
      //   } else {
      //
      //   }
      // })
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
