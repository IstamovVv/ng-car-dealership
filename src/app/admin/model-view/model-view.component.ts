import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from "../services/admin.service";
import { catchError, map, merge, Observable, observable, of, startWith, Subscription, switchMap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-model-view',
  templateUrl: './model-view.component.html',
  styleUrls: ['./model-view.component.scss']
})
export class ModelViewComponent implements OnInit {
  modelName!: string;

  objects?: any[];
  fields?: string[];

  resultsLength = 0;
  isLoadingResults = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private routerSubscription!: Subscription;

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngAfterViewInit() {

    this.routerSubscription = this.route.params.subscribe(params => {
      this.paginator.page
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isLoadingResults = true;
            const registered = this.adminService.getRegistered(params['modelName']);

            if (!registered) this.router.navigate(['/admin']);

            this.fields = registered.fields;

            return registered.service.get(this.paginator.pageIndex, this.paginator.length)
              .pipe(catchError(() => of(null)))
          }),
          map((objects: any[] | null) => {
            this.isLoadingResults = false;

            if (objects === null) return [];

            this.resultsLength = objects.length;
            return objects;
          })
        )
        .subscribe((objects: any[]) => {
          this.objects = objects;
        });
    })


  }

  ngOnInit(): void {
  }


}
