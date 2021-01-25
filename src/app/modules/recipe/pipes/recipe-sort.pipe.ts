import { Pipe, PipeTransform } from '@angular/core';
import { IRecipe } from '@shared/models';
import { RecipeSortByType, RecipeSortOrderType } from '@modules/recipe/util';

@Pipe({
  name: 'recipeSort',
})
export class RecipeSortPipe implements PipeTransform {
  transform(
    recipes: IRecipe[],
    sort_by: RecipeSortByType = 'name',
    sort_order: RecipeSortOrderType = 'asc'
  ): IRecipe[] {
    switch (sort_by) {
      case 'name':
        return [...recipes].sort(
          (a, b) =>
            a.name.localeCompare(b.name) * (sort_order === 'asc' ? 1 : -1)
        );

      case 'carbs':
      case 'fat':
      case 'protein':
      case 'calories':
        return [...recipes].sort((a, b) => {
          if (a[sort_by] > b[sort_by]) {
            return sort_order === 'asc' ? 1 : -1;
          }
          if (a[sort_by] < b[sort_by]) {
            return sort_order === 'asc' ? -1 : 1;
          }
          return 0;
        });

      case 'time_created':
      case 'time_updated':
        return [...recipes].sort((a, b) => {
          const aDate = Date.parse(a[sort_by]);
          const bDate = Date.parse(b[sort_by]);
          if (aDate > bDate) {
            return sort_order === 'asc' ? 1 : -1;
          }
          if (aDate < bDate) {
            return sort_order === 'asc' ? -1 : 1;
          }
          return 0;
        });

      default:
        return [...recipes];
    }
  }
}
