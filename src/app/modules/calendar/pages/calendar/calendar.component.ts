import { Component, Host, OnInit } from '@angular/core';
import { DateService } from '@app/services/date.service';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import { ApiService } from '@app/services/api.service';
import { switchMap, tap } from 'rxjs/operators';
import { IMeal } from '@shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'dm-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [DateService],
})
export class CalendarComponent implements OnInit {
  public meals$: Observable<IMeal[]>;

  public currentDate$: Observable<Date>;

  constructor(
    @Host() private dateService: DateService,
    private api: ApiService
  ) {
    this.currentDate$ = dateService.currentDate$;
  }

  public ngOnInit(): void {
    this.meals$ = this.currentDate$.pipe(
      switchMap((date) => {
        const start_date = startOfMonth(date);
        const end_date = endOfMonth(date);
        return this.api.getMeals({ start_date, end_date });
      })
      // tap((meals) =>
      //   console.log(
      //     `Found ${meals.length} meals planned for dates: ${meals
      //       .map((m) => m.date)
      //       .join(', ')}`
      //   )
      // )
    );
  }
}
