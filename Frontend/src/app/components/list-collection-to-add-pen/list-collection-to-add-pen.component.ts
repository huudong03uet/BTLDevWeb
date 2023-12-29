import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list-collection-to-add-pen',
  templateUrl: './list-collection-to-add-pen.component.html',
  styleUrls: ['./list-collection-to-add-pen.component.scss']
})
export class ListCollectionToAddPenComponent {
  @Input() pen_name: string = "Ha ha ha";


  datas = [
    {
      "collection_id": 1,
      "collection_name": "Collection 1",
      "collection_number_pens": 2,
      "has_this_pen": false,
      "avatar": "https://assets.codepen.io/206191/internal/avatars/users/default.png?fit=crop&format=auto&height=80&version=1628543716&width=80"
    },
    {
      "collection_id": 2,
      "collection_name": "Collection 2",
      "collection_number_pens": 1,
      "has_this_pen": true,
      "avatar": "https://assets.codepen.io/206191/internal/avatars/users/default.png?fit=crop&format=auto&height=80&version=1628543716&width=80"
    },
    {
      "collection_id": 3,
      "collection_name": "Collection 3",
      "collection_number_pens": 0,
      "has_this_pen": false,
      "avatar": "https://assets.codepen.io/206191/internal/avatars/users/default.png?fit=crop&format=auto&height=80&version=1628543716&width=80"
    },
    {
      "collection_id": 4,
      "collection_name": "Collection 4",
      "collection_number_pens": 0,
      "has_this_pen": false,
      "avatar": "https://assets.codepen.io/206191/internal/avatars/users/default.png?fit=crop&format=auto&height=80&version=1628543716&width=80"
    },
    {
      "collection_id": 5,
      "collection_name": "Collection 5",
      "collection_number_pens": 0,
      "has_this_pen": false,
      "avatar": "https://assets.codepen.io/206191/internal/avatars/users/default.png?fit=crop&format=auto&height=80&version=1628543716&width=80"
    },
    {
      "collection_id": 6,
      "collection_name": "Collection 6",
      "collection_number_pens": 0,
      "has_this_pen": false,
      "avatar": "https://assets.codepen.io/206191/internal/avatars/users/default.png?fit=crop&format=auto&height=80&version=1628543716&width=80"
    },
    {
      "collection_id": 7,
      "collection_name": "Collection 7",
      "collection_number_pens": 0,
      "has_this_pen": false,
      "avatar": "https://assets.codepen.io/206191/internal/avatars/users/default.png?fit=crop&format=auto&height=80&version=1628543716&width=80"
    }
  ]

  addPenToCollection(collection_id: number) {
    // TODO: Add pen to collection
  }



  

  data_views = this.datas;
  search: string = "";
  searchFiles(searchValue: string) {
    this.search = searchValue;
    if (searchValue == "") {
      this.data_views = this.datas;
    }
    else {
      this.data_views = [];
      for (let i = 0; i < this.datas.length; i++) {
        if (this.datas[i].collection_name.toLowerCase().includes(searchValue.toLowerCase())) {
          this.data_views.push(this.datas[i]);
        }
      }
    }
  }

}
