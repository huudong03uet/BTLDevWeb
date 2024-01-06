import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  isLogin: boolean = false;
  search: string = '';

  constructor(
    private router: Router,
    private searchService: SearchService
  ) { }
  
  changeSearch(search: string) {
    this.search = search;
    this.searchService.setSearch(search);
  }
  

  searchFile(search: string) {
    // go to search page
    this.router.navigate(['/search-page']);
  }
}
