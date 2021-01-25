import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IRecipe } from '@shared/models';
import { debounceTime, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Options } from '@angular-slider/ngx-slider';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { untilDestroyed } from '@ngneat/until-destroy';
import { RecipeSortByType, RecipeSortOrderType } from '@modules/recipe/util';

@Component({
  selector: 'dm-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public recipes$: Observable<IRecipe[]>;

  public filteredRecipes$: Observable<IRecipe[]>;

  public filterForm = new FormGroup({
    search: new FormControl<string>(null),
    calories: new FormControl<[number, number]>([0, 2000]),
    protein: new FormControl<[number, number]>([0, 200]),
    fat: new FormControl<[number, number]>([0, 200]),
    carbs: new FormControl<[number, number]>([0, 300]),
  });

  public filterRangeOptions: { [key: string]: Options } = {
    calories: {
      floor: 0,
      ceil: 2000,
    },
    protein: {
      floor: 0,
      ceil: 200,
    },
    fat: {
      floor: 0,
      ceil: 200,
    },
    carbs: {
      floor: 0,
      ceil: 300,
    },
  };

  public collapseTracker: { [key: string]: boolean } = {
    calories: true,
    fat: true,
    protein: true,
    carbs: true,
  };

  public sortOrder: RecipeSortOrderType = 'asc';
  public sortBy: RecipeSortByType = 'name';

  constructor(private route: ActivatedRoute, private title: Title) {}

  public ngOnInit(): void {
    this.title.setTitle(`DailyMenu - Recipe List`);
    this.recipes$ = this.route.data.pipe(
      map((data) => data.recipes),
      map((recipes) =>
        [...recipes].sort((a: IRecipe, b: IRecipe) =>
          a.name.localeCompare(b.name)
        )
      )
    );
    this.filteredRecipes$ = this.filterForm.valueChanges.pipe(
      debounceTime(200),
      startWith({
        search: '',
        calories: [0, 2000],
        carbs: [0, 300],
        fat: [0, 200],
        protein: [0, 200],
      }),
      switchMap(({ calories, protein, fat, carbs, search }) =>
        this.recipes$.pipe(
          map((recipes) =>
            recipes.filter((r) => {
              console.log(`filtering ${r.name}`);
              let searchMatch = false;
              let proteinMatch = false;
              let fatMatch = false;
              let carbMatch = false;
              let calMatch = false;
              if (
                r.name.toLowerCase().includes(search?.toLowerCase()) ||
                search === '' ||
                search === null
              ) {
                searchMatch = true;
              }
              if (protein[0] <= r.protein && r.protein <= protein[1]) {
                proteinMatch = true;
              }
              if (fat[0] <= r.fat && r.fat <= fat[1]) {
                fatMatch = true;
              }
              if (carbs[0] <= r.carbohydrates && r.carbohydrates <= carbs[1]) {
                carbMatch = true;
              }
              if (calories[0] <= r.calories && r.calories <= calories[1]) {
                calMatch = true;
              }
              return (
                searchMatch && proteinMatch && fatMatch && carbMatch && calMatch
              );
            })
          )
        )
      )
    );
  }

  public ngOnDestroy() {}

  public toggleFilterCollapse(name: string) {
    console.log(`Toggling ${name}`);
    this.collapseTracker = {
      ...this.collapseTracker,
      [name]: !this.collapseTracker[name],
    };
  }

  public selectSortBy(name: RecipeSortByType) {
    if (this.sortBy !== name) {
      this.sortBy = name;
    } else {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    }
  }
}
