import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss']
})
export class CustomPageComponent implements OnInit {

  @Input() backRef: string = '';

  constructor() {}

  ngOnInit(): void {}
}
