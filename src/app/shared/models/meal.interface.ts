import { IRecipe } from '@shared/models/recipe.interface';
import { ITimestamp } from '@shared/models/timestamp.interface';

export interface IMeal extends ITimestamp {
  id: number;
  date: string;
  notes: string;
  recipes: IRecipe[];
}
