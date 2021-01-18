import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IApiResponse, IMeal, IRecipe, IRecipeTag } from '@shared/models';
import { OptionalExceptFor } from '@shared/types';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

import format from 'date-fns/format';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public readonly BASE_URL = environment.api_url;

  constructor(private http: HttpClient) {}

  public listRecipes(): Observable<IRecipe[]> {
    return this.http
      .get<IApiResponse<IRecipe[]>>(`${this.BASE_URL}/recipes`)
      .pipe(map((resp) => resp.data));
  }

  public getRecipe(recipeId: number): Observable<IRecipe> {
    return this.http
      .get<IApiResponse<IRecipe>>(`${this.BASE_URL}/recipes/${recipeId}`)
      .pipe(map((resp) => resp.data));
  }

  public addRecipe(
    recipe: OptionalExceptFor<IRecipe, 'name'>
  ): Observable<IRecipe> {
    return this.http
      .post<IApiResponse<IRecipe>>(`${this.BASE_URL}/recipes`, recipe)
      .pipe(map((resp) => resp.data));
  }

  public updateRecipe(): Observable<IRecipe> {
    return throwError(`Not implemented!`);
  }

  public deleteRecipe(): Observable<any> {
    return throwError(`Not implemented!`);
  }

  public listRecipeTags(): Observable<IRecipeTag[]> {
    return throwError(`Not implemented!`);
  }

  public addTagToRecipe(
    recipeId: number,
    tagName: string
  ): Observable<IRecipeTag[]> {
    return this.http
      .patch<IApiResponse<IRecipeTag[]>>(
        `${this.BASE_URL}/recipes/${recipeId}/tags`,
        {
          tag: tagName,
        }
      )
      .pipe(map((resp) => resp.data));
  }

  public deleteTagFromRecipe(
    recipeId: number,
    tagName: string
  ): Observable<IRecipeTag[]> {
    return this.http
      .delete<IApiResponse<IRecipeTag[]>>(
        `${this.BASE_URL}/recipes/${recipeId}/tags/${tagName}`
      )
      .pipe(map((resp) => resp.data));
  }

  public listAllTags(): Observable<IRecipeTag[]> {
    return this.http
      .get<IApiResponse<IRecipeTag[]>>(`${this.BASE_URL}/tags`)
      .pipe(map((resp) => resp.data));
  }

  public getTag(): Observable<IRecipeTag> {
    return throwError(`Not implemented!`);
  }

  public createTag(): Observable<IRecipeTag> {
    return throwError(`Not implemented!`);
  }

  public updateTag(): Observable<IRecipeTag> {
    return throwError(`Not implemented!`);
  }

  public deleteTag(): Observable<IRecipeTag> {
    return throwError(`Not implemented!`);
  }

  public getMeals({
    start_date,
    end_date,
  }: {
    start_date: Date;
    end_date: Date;
  }): Observable<IMeal[]> {
    let httpParams: HttpParams = new HttpParams();
    if (start_date) {
      httpParams = httpParams.append(
        'start_date',
        format(start_date, 'yyyy-MM-dd')
      );
    }
    if (end_date) {
      httpParams = httpParams.append(
        'end_date',
        format(end_date, 'yyyy-MM-dd')
      );
    }
    return this.http
      .get<IApiResponse<IMeal[]>>(`${this.BASE_URL}/meals`, {
        params: httpParams,
      })
      .pipe(map((resp) => resp.data));
  }

  public getMealForDate(date: Date): Observable<IMeal | null> {
    return this.getMeals({ start_date: date, end_date: date }).pipe(
      map((meals) => (meals.length > 0 ? meals[0] : null))
    );
  }

  public assignRecipeToMeal(date: Date, recipe_id: number): Observable<IMeal> {
    return this.http
      .post<IApiResponse<IMeal>>(`${this.BASE_URL}/meals`, {
        date: format(date, 'yyyy-MM-dd'),
        recipe_id,
      })
      .pipe(map((resp) => resp.data));
  }
}
