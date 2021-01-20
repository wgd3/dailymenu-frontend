import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'dm-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss'],
})
export class NewRecipeComponent implements OnInit {
  public importForm = new FormGroup({
    url: new FormControl<string>(null, [Validators.required]),
  });

  public errorMessage: string;
  public importing = false;

  constructor(private api: ApiService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  public submitImportForm(): void {
    this.importing = true;
    this.errorMessage = null;
    this.api
      .importRecipe(this.importForm.getControl('url').value)
      .pipe(take(1))
      .subscribe(
        (recipe) => {
          this.toastr.success(`Recipe '${recipe.name}' created successfully!`);
          this.importForm.reset();
        },
        (err: HttpErrorResponse) => {
          this.toastr.error(`There was a problem importing this recipe`);
          this.errorMessage = err.message;
        },
        () => {
          this.importing = false;
        }
      );
  }
}
