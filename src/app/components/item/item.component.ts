import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoType} from "../item-list/item-list.component";
import {DatePipe} from "@angular/common";


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input('todo') todo : TodoType = {
    title : '',
    deadline: undefined,
    done: false

  };

  @Output() deleteRequest = new EventEmitter<TodoType>();

  @Output() completeRequest = new EventEmitter<TodoType>();

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
  }

  delete() {
    this.deleteRequest.emit(this.todo)
  }

  complete() {
    this.completeRequest.emit(this.todo)
  }
}
