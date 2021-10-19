import { Component, OnInit } from '@angular/core';
import { CommnetsService } from '../service/comments/commnets.service';
import { Comment } from '../interfaces/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  postCommnet() {

  }

}
