import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  isLogin: boolean = false;

  search: string = '';
  changeSearch(search: string) {
    this.search = search;
  }
  constructor(private router: Router) {
    
  }

  searchFile(search: string) {
    // console.log(search)
    // go to search page
    this.router.navigate(['/search-page'], { queryParams: { search: search } });
  }
}
