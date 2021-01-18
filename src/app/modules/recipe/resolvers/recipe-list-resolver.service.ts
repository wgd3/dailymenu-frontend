import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {IRecipe} from '@shared/models';
import {ApiService} from '@app/services/api.service';
import {DateService} from '@app/services/date.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipeListResolver implements Resolve<IRecipe[]> {

  constructor(private api: ApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecipe[]> | Promise<IRecipe[]> | IRecipe[] {
    return this.api.listRecipes().pipe(
      catchError((err) => {
        console.error(`Error loading list of recipes!`, err);
        return of([]);
      })
    );
  }
}
