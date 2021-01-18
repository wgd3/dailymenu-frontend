import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRecipe } from '@shared/models';
import { map, tap } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Title } from '@angular/platform-browser';

@UntilDestroy()
@Component({
  selector: 'dm-recipe-edit',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  public recipe: IRecipe;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.route.data
      .pipe(
        map((data) => (this.recipe = data.recipe)),
        tap((recipe) => this.title.setTitle(`${recipe.name}`)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  public ngOnDestroy() {}
}
