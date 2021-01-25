import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { ICalendarDay, IMeal } from '@shared/models';
import isEqual from 'date-fns/isEqual';
import parseISO from 'date-fns/parseISO';
import startOfDay from 'date-fns/startOfDay';

@Component({
  selector: 'dm-calendar-day',
  templateUrl: './calendar-day.component.html',
  styleUrls: ['./calendar-day.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarDayComponent implements OnInit, OnChanges {
  @Input() public day: ICalendarDay = null;

  @Input() public meals: IMeal[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  public get meal(): IMeal | undefined {
    const meal = this.meals?.find((m) =>
      isEqual(startOfDay(this.day.date), startOfDay(parseISO(m.date)))
    );
    return meal;
  }

  public navigateToRecipe(): void {
    this.router.navigateByUrl(`/recipes`);
  }
}
