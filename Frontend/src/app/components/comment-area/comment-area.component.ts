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
  data_loved = 0;
  data_view = 0;
  defaultAvatar: String = "https://i.pravatar.cc/150?img=1";
  @Input() id: number = 1;
  @Input() type: string = 'pen';

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
    this.fetchLikesCount();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  fetchComments() {
    let apiUrl = this.myService.getApiHost() + `/comment/get?id=${this.id}&type=${this.type}`;

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
    let apiUrl = this.myService.getApiHost() + `/comment/create?id=${this.id}&type=${this.type}&user_id=${this.user.getUserData()?.user_id}&comment=${this.commentText}&`;

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
    let apiUrl = this.myService.getApiHost() + `/comment/update?id=${this.id}&type=${this.type}&user_id=${this.user.getUserData()?.user_id}&comment=${this.commentText}&`;

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

  fetchLikesCount() {
    if (this.type === 'collection') {
      const apiUrl = this.myService.getApiHost() + `/your-work/collection/${this.id}/likeCount`;

      axios.get(apiUrl).then((response) => {
        this.data_loved = response.data.likesCount || 0;  // Update data_loved with the count
        console.log(this.type);
      }).catch((error) => {
        console.error('Error fetching likes count:', error);
      });
    }
  }

  copyLink() {
    const currentUrl = window.location.href;
    const tempInput = document.createElement('input');
    tempInput.value = currentUrl;
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    document.execCommand('copy');

    document.body.removeChild(tempInput);
  }

}
