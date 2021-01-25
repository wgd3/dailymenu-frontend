import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { CalendarLayoutComponent } from '@modules/calendar/components/calendar-layout/calendar-layout.component';
import { CalendarMonthDisplayComponent } from '@modules/calendar/components/calendar-month-display/calendar-month-display.component';
import { CalendarDayComponent } from '@modules/calendar/components/calendar-day/calendar-day.component';
import { DayDetailComponent } from '@modules/calendar/pages/day-detail/day-detail.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarLayoutComponent,
    CalendarMonthDisplayComponent,
    CalendarDayComponent,
    DayDetailComponent,
  ],
  imports: [SharedModule, CalendarRoutingModule],
})
export class CalendarModule {}
