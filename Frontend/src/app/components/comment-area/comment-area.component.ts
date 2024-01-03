import { Component, INJECTOR, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import axios from 'axios';
import { HostService } from 'src/app/host.service';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-comment-area',
  templateUrl: './comment-area.component.html',
  styleUrls: ['./comment-area.component.scss']
})
export class CommentAreaComponent implements OnInit, OnChanges {
  data_loved = 234;
  data_view = 19876;
  defaultAvatar: String = "https://i.pravatar.cc/150?img=1";
  @Input() pen_id: number = 1;
  data_comment = [
    {
      "comment_id": 8,
      "comment": "emkhongbietdau",
      "createdAt": "13 gio",
      "updatedAt": "13 gio",
      "type": "pen",
      "pen_id": 1,
      "collection_id": null,
      "user_id": 1,
      "reply": 5,
      "replyUser": "User5",
      "user": {
        "user_name": "User1",
        "avatar_path": null
      }
    }
  ];

  commentText: string = '';
  reply: any = null;

  comment_length = this.data_comment.length;

  constructor(private myService: HostService, private user: UserDataService) { }

  ngOnInit(): void {
    this.fetchComments();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  fetchComments() {
    let apiUrl = this.myService.getApiHost() + `/comment/get?id=${this.pen_id}&type=pen`;

    axios.get(apiUrl).then((response) => {
      this.data_comment = response.data.map((comment: any) => ({
        ...comment,
        user: {
          ...comment.user,
          avatar_path: comment.user.avatar_path || "https://i.pravatar.cc/150?img=1",
        }
      }));

      this.comment_length = this.data_comment.length;
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  onSubmit() {
    let apiUrl = this.myService.getApiHost() + `/comment/create?id=${this.pen_id}&type=pen&user_id=${this.user.getUserData()?.user_id}&comment=${this.commentText}&`;

    axios.post(apiUrl).then((response) => {
      let x = response.data;

      this.fetchComments();
    }).catch((error) => {
      console.error('Error:', error);
    });

    this.commentText = '';
    this.reply = null;
  }

  editComent() {
    let apiUrl = this.myService.getApiHost() + `/comment/update?id=${this.pen_id}&type=pen&user_id=${this.user.getUserData()?.user_id}&comment=${this.commentText}&`;

    axios.post(apiUrl).then((response) => {
      let x = response.data;

      this.fetchComments();
    }).catch((error) => {
      console.error('Error:', error);
    });

    this.commentText = '';
    this.reply = null;
  }

  deleteComent(comment_id: number) {
    let apiUrl = this.myService.getApiHost() + `/comment/delete?comment_id=${comment_id}`;

    axios.delete(apiUrl).then((response) => {
      let x = response.data;

      this.fetchComments();
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  replyComent(reply: number, replyUser: string) {
    this.reply = reply;
    this.commentText = '@' + replyUser + ' ';
  }

}
