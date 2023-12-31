import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.scss', '../settings/style-settings.scss']
})
export class SearchPageComponent implements OnInit {
  pen_ids = [1, 2, 3, 4, 5, 5, 3, 1, 2]
  collection_ids = [{collection_id: 1}, {collection_id: 2}, {collection_id: 3}, {collection_id: 4}, {collection_id: 5}, {collection_id: 5}, {collection_id: 3}, {collection_id: 1}, {collection_id: 2}]
  type: string = 'pen';

  constructor(
    ) {}

  ngOnInit(): void {
    // add active to pen-button
    const penButton = document.getElementById('pen-button');
    penButton?.classList.add('active');
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
