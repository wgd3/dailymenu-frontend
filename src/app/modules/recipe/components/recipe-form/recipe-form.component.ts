import { Component, OnInit } from '@angular/core';
import { IRecipe, IRecipeTag } from '@shared/models';
import { RecipeType } from '@shared/types';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { ApiService } from '@app/services/api.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'dm-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
  public supportedRecipeTypes: RecipeType[] = ['main', 'side', 'dessert'];

  public recipeForm: FormGroup<IRecipe> = new FormGroup<IRecipe>({
    author: new FormControl<string>(null),
    calories: new FormControl<number>(null),
    carbohydrates: new FormControl<number>(null),
    fat: new FormControl<number>(null),
    fiber: new FormControl<number>(null),
    image_url: new FormControl<string>(null),
    name: new FormControl<string>(null, { validators: [Validators.required] }),
    protein: new FormControl<number>(null),
    servings: new FormControl<number>(1),
    sodium: new FormControl<number>(null),
    source: new FormControl<string>(null),
    url: new FormControl<string>(null),
    recipe_type: new FormControl<RecipeType>('main'),
  });

  public tags: IRecipeTag[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api
      .listAllTags()
      .pipe(take(1))
      .subscribe(
        (tags) =>
          (this.tags = [...tags].sort((a: IRecipeTag, b: IRecipeTag) =>
            a.name.localeCompare(b.name)
          ))
      );
  }
}
