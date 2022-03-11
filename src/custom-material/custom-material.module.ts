import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomPageComponent } from './custom-page/custom-page.component';
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";



@NgModule({
  declarations: [
    CustomPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  exports: [
    CustomPageComponent
  ]
})
export class CustomMaterialModule { }
