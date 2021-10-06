import { Component, OnInit } from '@angular/core';
import { ArchiveService } from '../service/archive/archive.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  fightList: any[] = [];
  totalRecords: number = this.fightList.length;
  page: number = 1;
  maxSize: number = 2;

  constructor(private archiveService: ArchiveService) {


  }


  ngOnInit(): void {
    this.archiveService.FightList().subscribe(x => {
      this.fightList = x
      console.log(x)
    })

  }


  // getFights() {
  //     this.archiveService.FightList().subscribe((data) => console.log(data))
  //   }

}
