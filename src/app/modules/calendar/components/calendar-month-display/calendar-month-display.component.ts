import { Component, OnInit, SkipSelf } from '@angular/core';
import { DateService } from '@app/services/date.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'dm-calendar-month-display',
  templateUrl: './calendar-month-display.component.html',
  styleUrls: ['./calendar-month-display.component.scss'],
})
export class CalendarMonthDisplayComponent implements OnInit {
  public currentMonth$: Observable<Date>;

  constructor(@SkipSelf() private dateService: DateService) {}

  public ngOnInit(): void {
    this.currentMonth$ = this.dateService.currentDate$.pipe();
  }

  public nextMonth(): void {
    this.dateService.incrementDate('month');
  }

  public previousMonth(): void {
    this.dateService.decrementDate('month');
  }
}
