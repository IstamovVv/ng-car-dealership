import { Component, OnInit } from '@angular/core';
import { AdminService } from "../services/admin.service";
import { Registered } from "../services/registered.service";

@Component({
  selector: 'app-models-list',
  templateUrl: './models-list.component.html',
  styleUrls: ['./models-list.component.scss']
})
export class ModelsListComponent implements OnInit {
  public readonly registered: Record<string, Registered<any>>;

  constructor(private adminService: AdminService) {
    this.registered = adminService.getRegisteredList();
  }

  ngOnInit(): void {

  }

}
