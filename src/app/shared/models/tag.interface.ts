import { IRecipe } from './recipe.interface';
import { ITimestamp } from './timestamp.interface';

export interface IRecipeTag extends ITimestamp {
    id: number;
    name: string;
    description: string;
    text_color: string;
    bg_color: string;

    recipes?: IRecipe[];
}