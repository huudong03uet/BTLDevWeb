import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { UserDataService } from 'src/app/services/user-data.service';
import { SearchService } from 'src/app/search.service';
import { Subscription } from 'rxjs';
import { HostService } from 'src/app/host.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss', '../settings/style-settings.scss']
})
export class SearchPageComponent implements OnInit, OnChanges {
  pen_ids: any;
  collection_ids: any;
  type: string = 'pen';
  private searchSubscription: Subscription;

  constructor(
    private searchService: SearchService,
    private myService: HostService,
  ) {
    this.searchSubscription = this.searchService.search$.subscribe(search => {
      let apiUrl = ''
      if (this.type == 'pen') {
        apiUrl = this.myService.getApiHost() + `/search/pen?q=${search}`
      } else if (this.type == "collection") {
        apiUrl = this.myService.getApiHost() + `/search/collection?q=${search}`
      }

      axios.get(apiUrl).then((response) => {
        this.pen_ids = response.data;
        console.log(this.pen_ids)
      }).catch((error) => {
        console.error('Error:', error);
      });
    });

  }

  ngOnInit(): void {
    const penButton = document.getElementById('pen-button');
    penButton?.classList.add('active');
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  clickButton(type: string) {
    // find search-control
    let searchControl = document.getElementsByClassName('center-search-control');
    this.type = type;

    if (type === 'pen') {
      const penButton = document.getElementById('pen-button');
      const collectionButton = document.getElementById('collection-button');
      const projectButton = document.getElementById('project-button');
      penButton?.classList.add('active');
      collectionButton?.classList.remove('active');
      projectButton?.classList.remove('active');

      // set style: border-top: 4px solid hsl( 196.18deg 100% 52.75% );
      searchControl[0].classList.remove('collection-control');
      searchControl[0].classList.remove('project-control');
      searchControl[0].classList.add('pen-control');
    }

    if (type === 'collection') {
      const penButton = document.getElementById('pen-button');
      const collectionButton = document.getElementById('collection-button');
      const projectButton = document.getElementById('project-button');
      penButton?.classList.remove('active');
      collectionButton?.classList.add('active');
      projectButton?.classList.remove('active');

      // add style for search-control
      searchControl[0].classList.remove('pen-control');
      searchControl[0].classList.remove('project-control');
      searchControl[0].classList.add('collection-control');


    }

    if (type === 'project') {
      const penButton = document.getElementById('pen-button');
      const collectionButton = document.getElementById('collection-button');
      const projectButton = document.getElementById('project-button');
      penButton?.classList.remove('active');
      collectionButton?.classList.remove('active');
      projectButton?.classList.add('active');

      // add style for search-control
      searchControl[0].classList.remove('pen-control');
      searchControl[0].classList.remove('collection-control');
      searchControl[0].classList.add('project-control');
    }
  }
}
