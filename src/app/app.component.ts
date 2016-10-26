
// export class AppComponent {
//   title = 'app works!';
//   observable$: Observable<{}>;
//
//   constructor(http: Http) {
//     this.observable$ = http
//       .get(environment.server + "/api/simple")
//       .map((response: Response) => response.json());
//   }
// }

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{title}}</h1>
    <div class="header-bar"></div>
    <nav>
      <a routerLink="/hotels" routerLinkActive="active">Heroes</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
}
