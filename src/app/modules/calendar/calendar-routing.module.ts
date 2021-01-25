import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from '@modules/calendar/pages/calendar/calendar.component';
import { DayDetailComponent } from '@modules/calendar/pages/day-detail/day-detail.component';
import { DayMenuResolver } from '@modules/calendar/resolvers/day-menu-resolver.service';
import { RecipeListResolver } from '@modules/recipe/resolvers/recipe-list-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: CalendarComponent,
  },
  {
    path: ':date',
    component: DayDetailComponent,
    resolve: {
      meal: DayMenuResolver,
      recipes: RecipeListResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
