import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnyRatingComponent } from './rating.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // libs
    NgxStarRatingModule
  ],
  declarations: [AnyRatingComponent],
  exports: [AnyRatingComponent],
})
export class AnyRatingModule { }
