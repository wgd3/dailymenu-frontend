import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { DateService } from '@app/services/date.service';
import { ICalendarMonth, IMeal } from '@shared/models';
import { BehaviorSubject, Observable } from 'rxjs';

import startOfMonth from 'date-fns/startOfMonth';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import startOfDay from 'date-fns/startOfDay';
import isEqual from 'date-fns/isEqual';
import parseISO from 'date-fns/parseISO';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'dm-calendar-layout',
  templateUrl: './calendar-layout.component.html',
  styleUrls: ['./calendar-layout.component.scss'],
})
export class CalendarLayoutComponent implements OnInit {
  @Input() public meals: IMeal[] = [];

  public currentMonth$: Observable<Date>;

  public calendar$: Observable<ICalendarMonth>;

  public today = new Date();

  constructor(@SkipSelf() private dateService: DateService) {}

  ngOnInit(): void {
    this.currentMonth$ = this.dateService.currentDate$;

    this.calendar$ = this.currentMonth$.pipe(
      tap((date) =>
        console.log(
          `Detected change in date (now ${date.toISOString()}), getting new calendar`
        )
      ),
      map((date) => this.dateService.getCalendarMonth(date))
    );
  }

  public isToday(a: Date, b: Date): boolean {
    const aStart = startOfDay(a);
    const bStart = startOfDay(b);
    return isEqual(aStart, bStart);
  }
}
