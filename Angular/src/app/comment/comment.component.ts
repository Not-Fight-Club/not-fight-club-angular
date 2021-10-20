import { Component, Input, OnInit } from '@angular/core';
import { CommnetsService } from '../service/comments/commnets.service';
import { Comment } from '../interfaces/comment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Fight } from '../interfaces/fight';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() fight!: Fight;
  commentList: Comment[] = [];

  constructor(private http: HttpClient, private commentservive: CommnetsService) { }

  ngOnInit(): void {
    this.getComments();
  }

  postCommnet() {

  }

  save() {
    console.log("save clicked");
    this.http.post('https://localhost:44364/post', {

    }
    )

  }

  cancel() { }

  getComments(): void {

    this.commentservive.getComments()
      .subscribe(comms => this.commentList = comms);
    console.log(`logged: ${this.commentList}`)


  }

}
