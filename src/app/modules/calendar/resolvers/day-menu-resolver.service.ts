import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { IMeal } from '@shared/models';
import { ApiService } from '@app/services/api.service';

import parseISO from 'date-fns/parseISO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DayMenuResolver implements Resolve<IMeal> {
  constructor(private api: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IMeal> | Promise<IMeal> | IMeal {
    const dateParam = route.url.pop();
    const date = parseISO(dateParam.toString());
    return this.api.getMealForDate(date);
  }
}
