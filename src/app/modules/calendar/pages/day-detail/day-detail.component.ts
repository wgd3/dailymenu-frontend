import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IMeal, IRecipe } from '@shared/models';
import { Observable, of } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';

import parseISO from 'date-fns/parseISO';
import { ApiService } from '@app/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'dm-day-detail',
  templateUrl: './day-detail.component.html',
  styleUrls: ['./day-detail.component.scss'],
})
export class DayDetailComponent implements OnInit {
  public form: FormGroup = new FormGroup({
    recipe: new FormControl(null, {
      validators: [Validators.required],
    }),
  });

  public recipes$: Observable<IRecipe[]>;
  public meal$: Observable<IMeal>;

  public date: Date;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.recipes$ = this.route.data.pipe(
      map((data) =>
        [...data.recipes].sort((a: IRecipe, b: IRecipe) =>
          a.name.localeCompare(b.name)
        )
      )
    );
    this.meal$ = this.route.data.pipe(map((data) => data.meal));
    const dateParam = this.route.snapshot.params.date;
    this.date = parseISO(dateParam.toString());
  }

  public saveRecipe(): void {
    if (this.form.valid) {
      this.api
        .assignRecipeToMeal(this.date, [this.form.get('recipe').value])
        .pipe(take(1))
        .subscribe(
          (meal) => {
            this.toastr.success(
              `Added recipe to the menu! Page will reload shortly`
            );
            setTimeout(() => {
              window.location.reload();
            }, 500);
          },
          (err: HttpErrorResponse) => {
            alert(`Unable to assign recipe: ${err.error.message}`);
          }
        );
    }
  }
}
