import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'dm-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;

  public menuLinks = [
    {
      name: 'Recipes',
      url: '/recipes',
    },
    {
      name: 'Calendar',
      url: '/calendar',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // collapse the dropdown menu whenever the user successfully navigates pages
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isCollapsed = true;
      });
  }
}
