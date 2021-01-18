import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { SharedModule } from '@shared/shared.module';
import { NewRecipeComponent } from './pages/new-recipe/new-recipe.component';

@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeFormComponent,
    NewRecipeComponent,
  ],
  imports: [SharedModule, RecipeRoutingModule],
})
export class RecipeModule {}
