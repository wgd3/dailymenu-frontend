import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IRecipe } from '@shared/models';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'dm-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  public recipes$: Observable<IRecipe[]>;

  constructor(private route: ActivatedRoute, private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle(`DailyMenu - Recipe List`);
    this.recipes$ = this.route.data.pipe(
      map((data) => data.recipes),
      map((recipes) =>
        [...recipes].sort((a: IRecipe, b: IRecipe) =>
          a.name.localeCompare(b.name)
        )
      )
    );
  }
}
