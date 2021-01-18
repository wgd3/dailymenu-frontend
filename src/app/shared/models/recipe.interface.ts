import { IMeal } from '@shared/models/meal.interface';
import { IRecipeTag } from '@shared/models/tag.interface';
import { RecipeType } from '@shared/types';
import { ITimestamp } from './timestamp.interface';

export interface IRecipe extends ITimestamp {
  id?: number;
  name: string;
  url: string;
  image_url: string;
  source: string;
  author: string;
  recipe_type: RecipeType;

  unused?: boolean;
  slug?: string;

  servings: number;
  calories: number;
  fat: number;
  protein: number;
  carbohydrates: number;
  sodium: number;
  fiber: number;

  tags?: IRecipeTag[];
  meals?: IMeal[];
}
