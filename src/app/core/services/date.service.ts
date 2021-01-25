import { Injectable } from '@angular/core';

import format from 'date-fns/format';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import startOfMonth from 'date-fns/startOfMonth';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import getWeeksInMonth from 'date-fns/getWeeksInMonth';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import addWeeks from 'date-fns/addWeeks';
import subWeeks from 'date-fns/subWeeks';
import isWithinInterval from 'date-fns/isWithinInterval';
import addMonths from 'date-fns/addMonths';
import subMonths from 'date-fns/subMonths';
import { BehaviorSubject, Observable } from 'rxjs';
import endOfWeek from 'date-fns/endOfWeek';
import { ICalendarDay, ICalendarMonth, ICalendarWeek } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  public currentDate$: Observable<Date>;
  private currentDate$$ = new BehaviorSubject<Date>(new Date());

  constructor() {
    this.currentDate$ = this.currentDate$$.asObservable();
  }

  /**
   * Increments the {@link currentDate$$} by 1 period
   *
   * @param period
   */
  public incrementDate(period: 'day' | 'week' | 'month' = 'day'): void {
    const incrementFunc =
      period === 'day' ? addDays : period === 'week' ? addWeeks : addMonths;
    this.currentDate$$.next(incrementFunc(this.currentDate$$.value, 1));
  }

  /**
   * Decrements the {@link currentDate$$} by 1 period
   *
   * @param period
   */
  public decrementDate(period: 'day' | 'week' | 'month' = 'day'): void {
    const decrementFunc =
      period === 'day' ? subDays : period === 'week' ? subWeeks : subMonths;
    this.currentDate$$.next(decrementFunc(this.currentDate$$.value, 1));
  }

  /**
   * Manually sets the {@link currentDate$$} value
   *
   * @param date
   */
  public setDate(date: Date): void {
    this.currentDate$$.next(date);
  }

  public getCalendarMonth(date: Date): ICalendarMonth {
    const rv: ICalendarMonth = {
      weeks: [],
    };

    const startDate = startOfMonth(date);
    const endDate = lastDayOfMonth(date);
    const weekCount = getWeeksInMonth(date);
    const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

    // figure out how many days, if any, need to be added in (if weeks start on
    // Sunday, and the first day of the month is a Wednesday, then 3 buffer
    // (empty) days are needed)
    const firstWeekStart = startOfWeek(startDate);

    for (let i = 0; i < weekCount; i++) {
      // console.log(`Creating days for week #${i}`);
      const startOfThisWeek = addWeeks(firstWeekStart, i);
      // @ts-ignore
      const days: [
        ICalendarDay,
        ICalendarDay,
        ICalendarDay,
        ICalendarDay,
        ICalendarDay,
        ICalendarDay,
        ICalendarDay
      ] = Array.from({ length: 7 }).map(
        (_, dayNumber): ICalendarDay => {
          const dayDate = addDays(startOfThisWeek, dayNumber);
          return {
            date: dayDate,
            dayOfWeek: getDay(dayDate),
            isDayInMonth: isWithinInterval(dayDate, {
              start: startDate,
              end: endDate,
            }),
          };
        }
      );
      const week: ICalendarWeek = { days };
      // console.log(`Days: `, week);
      rv.weeks.push(week);
    }

    return rv;
  }

  public getWeekStartAndEnd(date: Date): Interval {
    return {
      start: startOfWeek(date),
      end: endOfWeek(date),
    };
  }
}
