import { Component, INJECTOR, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-comment-area',
  templateUrl: './comment-area.component.html',
  styleUrls: ['./comment-area.component.scss']
})
export class CommentAreaComponent {
  data_loved = 234;
  data_view = 19876;
  @Input() pen_id: number = 0;
 data_comment = [
    {
      name: "Nguyễn Văn A",
      avatar: "https://i.pravatar.cc/150?img=1",
      user_name: "nguyenvana",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.",
      time: "1 giờ trước"
    },
    {
      name: "Nguyễn Văn B",
      avatar: "https://i.pravatar.cc/150?img=1",
      user_name: "nguyenvanb",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.",
      time: "2 giờ trước"
    },
    {
      name: "Nguyễn Văn C",
      avatar: "https://i.pravatar.cc/150?img=1",
      user_name: "nguyenvanc",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quibusdam.",
      time: "3 giờ trước"
    }

  ];

  comment_length = this.data_comment.length;

}
