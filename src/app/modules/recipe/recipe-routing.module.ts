import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from '@modules/recipe/pages/recipe-list/recipe-list.component';
import { RecipeListResolver } from '@modules/recipe/resolvers/recipe-list-resolver.service';
import { RecipeDetailComponent } from '@modules/recipe/pages/recipe-detail/recipe-detail.component';
import { RecipeDetailResolver } from '@modules/recipe/resolvers/recipe-edit-resolver.service';
import { NewRecipeComponent } from '@modules/recipe/pages/new-recipe/new-recipe.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeListComponent,
    resolve: {
      recipes: RecipeListResolver,
    },
  },
  {
    path: 'new',
    component: NewRecipeComponent,
  },
  {
    path: ':recipe_id',
    component: RecipeDetailComponent,
    resolve: {
      recipe: RecipeDetailResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeRoutingModule {}
