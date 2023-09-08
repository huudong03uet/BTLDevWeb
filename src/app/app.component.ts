import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private titleService: Title, private router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const routeData = this.getRouteData(router.routerState, 'title');
        if (routeData) {
          this.titleService.setTitle(routeData);
        }
      }
    });
  }
  
  private getRouteData(state: any, key: string): string | null {
    return null || state.snapshot._root.children[0].value.data.title
  }
}
