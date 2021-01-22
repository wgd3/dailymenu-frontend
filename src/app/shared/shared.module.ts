import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ToastrModule } from 'ngx-toastr';
import { RecipeCardComponent } from './components/recipe-card/recipe-card.component';
import { ContentLoaderModule } from '@ngneat/content-loader';

@NgModule({
  declarations: [RecipeCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CollapseModule.forRoot(),
    AccordionModule.forRoot(),
    ToastrModule.forRoot(),
    ContentLoaderModule,
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
  ],
})
export class SharedModule {}
