import { Component, OnInit } from '@angular/core';
import { AdminService } from "../services/admin.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-model-view',
  templateUrl: './model-view.component.html',
  styleUrls: ['./model-view.component.scss']
})
export class ModelViewComponent implements OnInit {
  public objects?: any[];
  public fields?: string[];

  private routerSubscription!: Subscription;

  constructor(private adminService: AdminService,
              private route: ActivatedRoute,
              private router: Router) {

    this.routerSubscription = route.params.subscribe(params => {
      const modelName = params['modelName'];

      const registered = this.adminService.getRegistered(modelName);

      if (!registered) {
        this.router.navigate(['admin']);
      } else {
        registered.service.get(0, 10).subscribe((objects: any) => {
          this.objects = objects;
        });

        this.fields = registered.fields;
      }
    })
  }

  ngOnInit(): void {
  }


}
