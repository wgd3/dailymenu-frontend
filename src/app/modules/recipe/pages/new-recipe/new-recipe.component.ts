import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';
import { ApiService } from '@app/services/api.service';

@Component({
  selector: 'dm-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.scss'],
})
export class NewRecipeComponent implements OnInit {
  public importForm = new FormGroup({
    url: new FormControl<string>(null, [Validators.required]),
  });

  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  public submitImportForm(): void {}
}
