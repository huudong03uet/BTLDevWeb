import { Component } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {
  user = {
    name: "21020000 - Nguyễn Văn A",
    avatar: "https://assets.codepen.io/t-1/user-default-avatar.jpg?fit=crop&format=auto&height=80&version=0&width=80",
    link_user: "localhost:4200/following",
    name_collection: "Neumorphic Elements",
  }



  data_pen = [
    {
      title: "halloween game",
      user_name: "user1",
      pro: true,
      avatar: "https://assets.codepen.io/5126815/internal/avatars/users/default.png?fit=crop&format=auto&height=80&version=1675562246&width=80",
      comment: 10,
      heart: 20,
      view: 30,
      update_on: "2021-10-31",
      create_on: "2021-10-31",
      type: "pen"
    },

    {
      title: "halloween game 1",
      user_name: "user2",
      pro: false,
      avatar: "https://assets.codepen.io/5126815/internal/avatars/users/default.png?fit=crop&format=auto&height=80&version=1675562246&width=80",
      comment: 20,
      heart: 30,
      view: 40,
      update_on: "2021-10-31",
      create_on: "2021-10-31",
      type: "pen"
    },

    {
      title: "halloween game 2",
      user_name: "user3",
      pro: true,
      avatar: "https://assets.codepen.io/5126815/internal/avatars/users/default.png?fit=crop&format=auto&height=80&version=1675562246&width=80",
      comment: 30,
      heart: 40,
      view: 50,
      update_on: "2021-10-31",
      create_on: "2021-10-31",
      type: "pen"
    },

    {
      title: "halloween game 3",
      user_name: "user4",
      pro: false,
      avatar: "https://assets.codepen.io/5126815/internal/avatars/users/default.png?fit=crop&format=auto&height=80&version=1675562246&width=80",
      comment: 40,
      heart: 50,
      view: 60,
      update_on: "2021-10-31",
      create_on: "2021-10-31",type: "pen"
    },

    {
      title: "halloween game 4",
      user_name: "user5",
      pro: true,
      avatar: "https://assets.codepen.io/5126815/internal/avatars/users/default.png?fit=crop&format=auto&height=80&version=1675562246&width=80",
      comment: 50,
      heart: 60,
      view: 70,
      update_on: "2021-10-31",
      create_on: "2021-10-31",type: "pen"
    },

    {
      title: "halloween game 5",
      user_name: "user6",
      pro: false,
      avatar: "https://assets.codepen.io/5126815/internal/avatars/users/default.png?fit=crop&format=auto&height=80&version=1675562246&width=80",
      comment: 60,
      heart: 70,
      view: 80,
      update_on: "2021-10-31",
      create_on: "2021-10-31",type: "pen"
    },
  ]


  pen_ids= [
    1, 2, 3,
    2, 3, 1, 
    3, 2, 1
  ]

}
