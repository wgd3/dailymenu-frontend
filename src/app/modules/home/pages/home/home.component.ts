import { Component, OnInit } from '@angular/core';
import {DateService} from '@app/services/date.service';
import {Observable} from 'rxjs';
import {ApiService} from '@app/services/api.service';
import {IMeal} from '@shared/models';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'dm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DateService]
})
export class HomeComponent implements OnInit {

  public date$: Observable<Date>;

  public meal$: Observable<IMeal>;

  constructor(private dateService: DateService, private api: ApiService) { }

  ngOnInit(): void {
    this.date$ = this.dateService.currentDate$;

    this.meal$ = this.date$.pipe(
      switchMap((date) => this.api.getMealForDate(date))
    );
  }

}
