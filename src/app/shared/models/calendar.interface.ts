export interface ICalendarDay {
  date: Date;
  dayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  isDayInMonth: boolean;
}

export interface ICalendarWeek {
  days: [
    ICalendarDay,
    ICalendarDay,
    ICalendarDay,
    ICalendarDay,
    ICalendarDay,
    ICalendarDay,
    ICalendarDay
  ];
}

export interface ICalendarMonth {
  weeks: Array<ICalendarWeek>;
}
