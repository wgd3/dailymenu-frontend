import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { IRecipe } from '@shared/models';
import { EMPTY, Observable } from 'rxjs';
import { ApiService } from '@app/services/api.service';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class RecipeDetailResolver implements Resolve<IRecipe | null> {
  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IRecipe | null> | Promise<IRecipe | null> | IRecipe | null {
    const recipe_id = +route.paramMap.get('recipe_id');
    return this.api.getRecipe(recipe_id).pipe(
      catchError((err) => {
        console.error(`Recipe ${recipe_id} not found!`, err);
        this.toastr.error(`No recipe with matching ID was found!`);
        this.router.navigateByUrl(`/recipes`);
        return EMPTY;
      })
    );
  }
}
