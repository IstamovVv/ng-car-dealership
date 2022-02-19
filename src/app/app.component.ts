import { Component, OnInit } from '@angular/core';
import { HttpService } from "./services/http.service";
import { Client } from "./models";
import { HttpResponse } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'my-angular-project';

  constructor(private httpService: HttpService) {
  }

  ngOnInit() {
    this.httpService.get<Client[]>('clients', 0, 10).subscribe((data: Client[]) => {
      console.log(data)
    })

    this.httpService.delete('clients', 8).subscribe((response: HttpResponse<any>) => {
      console.log(response)
    })
  }
}
