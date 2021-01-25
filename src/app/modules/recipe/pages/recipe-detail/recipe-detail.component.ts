import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRecipe } from '@shared/models';
import { map, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Title } from '@angular/platform-browser';
import { FormArray, FormControl, FormGroup } from '@ngneat/reactive-forms';

@UntilDestroy()
@Component({
  selector: 'dm-recipe-edit',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  public recipe: IRecipe;

  public recipeForm: FormGroup<IRecipe> = new FormGroup<IRecipe>({
    name: new FormControl<string>(null),
    calories: new FormControl<number>(0),
    fat: new FormControl<number>(0),
    protein: new FormControl<number>(0),
    carbohydrates: new FormControl<number>(0),
    sodium: new FormControl<number>(0),
    fiber: new FormControl<number>(0),
    url: new FormControl<string>(null),
    image_url: new FormControl<string>(null),
    servings: new FormControl<number>(1),
    source: new FormControl<string>(null),
    author: new FormControl<string>(null),
    recipe_type: new FormControl<'main' | 'side' | 'dessert'>('main'),
    steps: new FormArray<string>([]),
    ingredients: new FormArray<string>([]),
  });

  public get stepArray(): FormArray<string> {
    return this.recipeForm.getControl('steps') as FormArray<string>;
  }
  public get ingredientArray(): FormArray<string> {
    return this.recipeForm.getControl('ingredients') as FormArray<string>;
  }

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => (this.recipe = data.recipe)),
        tap((data) => this.populateRecipe(data)),
        tap((recipe) => this.title.setTitle(`${recipe.name}`)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  public ngOnDestroy() {}

  public createEmptyInputControl(): FormControl<string> {
    return new FormControl<string>(null);
  }

  public addStep(data?: string) {
    const control = this.createEmptyInputControl();
    control.reset(data || null);
    this.stepArray.push(control);
  }

  public addIngredient(data?: string) {
    const control = this.createEmptyInputControl();
    control.reset(data || null);
    this.ingredientArray.push(control);
  }

  public populateRecipe(recipe: IRecipe) {
    this.recipeForm.reset({
      ...recipe,
    });
    recipe.steps?.forEach((step) => {
      this.addStep(step);
    });
    recipe.ingredients?.forEach((i) => {
      this.addIngredient(i);
    });
    console.log(`Recipe data`, this.recipeForm.value);
  }
}
