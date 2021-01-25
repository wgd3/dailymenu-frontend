import { Component, Input, OnInit } from '@angular/core';
import { IRecipe } from '@shared/models';

@Component({
  selector: 'dm-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.scss'],
})
export class RecipeCardComponent implements OnInit {
  @Input() public recipe: IRecipe;

  @Input() public size: 'sm' | 'md' | 'lg' = 'md';

  constructor() {}

  ngOnInit(): void {}
}
