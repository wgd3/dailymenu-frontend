import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ToastrModule } from 'ngx-toastr';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { ContentLoaderModule } from '@ngneat/content-loader';
import { DateControllerComponent } from './components/date-controller/date-controller.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [RecipeCardComponent, DateControllerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    ContentLoaderModule,
    NgxSliderModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CollapseModule,
    ToastrModule,
    AccordionModule,
    RecipeCardComponent,
    ContentLoaderModule,
    DateControllerComponent,
    BsDropdownModule,
    NgxSliderModule,
  ],
})
export class SharedModule {}
