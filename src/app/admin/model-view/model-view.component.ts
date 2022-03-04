import { Component, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AdminService } from "../services/admin.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { ModalService } from "../../common/services/modal.service";
import { ModalComponent } from "../../common/modal/modal.component";
import { createCustomElement } from "@angular/elements";

@Component({
  selector: 'app-model-view',
  templateUrl: './model-view.component.html',
  styleUrls: ['./model-view.component.scss']
})
export class ModelViewComponent implements OnInit, OnDestroy {
  modelName!: string;

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
      const registered = this.adminService.getRegistered(params['modelName']);

      if (!registered) this.router.navigate(['/admin']);

      this.fields = registered.fields.slice();
      this.fields.push('actions');

      registered.service.get(0, 10).subscribe((objects: any[]) => {
        setTimeout(() => {
          this.objects = objects;
          this.isLoadingResults = false;
        }, 500);
      })
    })
  }

  handleModalShow() {
    const subject = this.modal.showAsElement('Вы уверены, что хотите удалить данный элемент?');
    subject.subscribe((response) => {
      console.log(response)
    })
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
