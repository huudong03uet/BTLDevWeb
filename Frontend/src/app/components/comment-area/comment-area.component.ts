import { Component, INJECTOR, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import axios from 'axios';
import { HostService } from 'src/app/host.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-comment-area',
  templateUrl: './comment-area.component.html',
  styleUrls: ['./comment-area.component.scss']
})
export class CommentAreaComponent implements OnInit, OnChanges {
  data_loved = 0;
  data_view = 0;
  defaultAvatar: String = "https://assets.codepen.io/t-1/user-default-avatar.jpg?format=auto&version=0&width=80&height=80";
  @Input() id: number = 1;
  @Input() type: string = 'pen';
  isEdit = false;
  comment_id = 0;
  CreatedOn: string = '';
  UpdatedOn: string = '';

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
      "numlike": 0,
      "numview": 0,
      "numcomment": 0,
      "user": {
        "user_name": "User1",
        "avatar_path": null,
      }
    }
  ];

  commentText: string = '';
  reply: any = null;

  comment_length = this.data_comment.length;

  constructor(private myService: HostService, private user: UserDataService,
    private toastr: ToastrService
  ) {
    this.toastr.toastrConfig.positionClass = 'toast-top-center';
  }


  ngOnInit(): void {
    this.fetchComments();
    this.fetchLikesCount();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fetchComments();
    this.fetchLikesCount();
  }

  fetchComments() {
    let apiUrl = this.myService.getApiHost() + `/comment/get?id=${this.id}&type=${this.type}`;


    axios.get(apiUrl).then((response) => {
      this.data_loved = response.data.numlike;
      this.data_view = response.data.numview;

      this.CreatedOn = response.data.CreatedOn;
      this.UpdatedOn = response.data.UpdatedOn;

      this.CreatedOn = this.CreatedOn.toString().substring(0, 10);
      this.UpdatedOn = this.UpdatedOn.toString().substring(0, 10);

      let xx = response.data.comments;
      this.data_comment = xx.map((comment: any) => ({
        ...comment,
        user: {
          ...comment.user,
          avatar_path: comment.user.avatar_path || "https://assets.codepen.io/t-1/user-default-avatar.jpg?format=auto&version=0&width=80&height=80",
        }
      }));

      this.comment_length = this.data_comment.length;
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  onSubmit() {
    let apiUrl;

    if (this.isEdit == false) {
      apiUrl = this.myService.getApiHost() + `/comment/create?id=${this.id}&type=${this.type}&user_id=${this.user.getUserData()?.user_id}&comment=${this.commentText}&reply=${this.reply}`;
      axios.post(apiUrl).then((response) => {
        // let x = response.data;
      }).catch((error) => {
        console.error('Error:', error);
      });

    } else {
      apiUrl = this.myService.getApiHost() + `/comment/update?comment_id=${this.comment_id}&updatedCommentText=${this.commentText}`;
      axios.put(apiUrl).then((response) => {
        // let x = response.data;
      }).catch((error) => {
        console.error('Error:', error);
      });
    }

    this.fetchComments();

    this.commentText = '';
    this.reply = null;
    this.isEdit = false;
  }

  editComent(comment_id: number, user_id: number, commentText: string) {

    if (this.user.getUserData()?.user_id != user_id) {
      return;
    }

    this.commentText = commentText;

    this.comment_id = comment_id;

    this.isEdit = true;
  }

  deleteComent(comment_id: number, user_id: number) {
    
    if (this.user.getUserData()?.user_id != user_id) {
      return;
    }

    let userResponse = confirm("Do you want to delete this comment?");
    if (!userResponse) {
      return;
    }


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
    let currentUrl = '';

    if (this.type === 'pen') {
      currentUrl = `${window.location.origin}/pen/${this.id}`;
    } else {
      currentUrl = `${window.location.origin}/collection/${this.id}`;
    }

    const tempInput = document.createElement('input');
    tempInput.value = currentUrl;
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices

    document.execCommand('copy');

    document.body.removeChild(tempInput);
    this.toastr.success('Link copied to clipboard');
  }


}
