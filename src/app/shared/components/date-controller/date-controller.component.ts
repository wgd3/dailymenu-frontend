import { Component, Input, OnInit } from '@angular/core';
import { DateService } from '@app/services/date.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'dm-date-controller',
  templateUrl: './date-controller.component.html',
  styleUrls: ['./date-controller.component.scss'],
})
export class DateControllerComponent implements OnInit {
  @Input() public align: 'start' | 'center' | 'end' = 'end';

  public currentDate$: Observable<Date> = this.dateService.currentDate$;

  constructor(private dateService: DateService) {}

  ngOnInit(): void {}
}
