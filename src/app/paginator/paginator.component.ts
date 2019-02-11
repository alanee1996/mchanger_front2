import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  public currenctPage: number;
  public totalPage: number;
  public hasNext: boolean;
  @Input()
  public onClickPre: any;
  public onClickNumber: any;
  @Input()
  public onClickNext: any = (() => { console.log('asd'); });
  item = [1, 2, 3, 4, 5, 6];

  constructor() { }

  ngOnInit() {
  }

  clickEventPrev() {
    this.onClickPre(1);
  }

  clickEventNext() {
    this.onClickNext();
  }

  numberClick() {
    this.onClickNumber();
  }

}
