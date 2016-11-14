import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="header-bar"></div>
    <nav>
      <!--<a routerLink="/hotels" routerLinkActive="active">Heroes</a>-->
      <!--<a routerLink="/monthly" routerLinkActive="active">Monthly</a>-->
      <!--<a routerLink="/tasks" routerLinkActive="active">Tasks</a>-->
      <!--<a routerLink="/graph" routerLinkActive="active">Graph</a>-->
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
}
