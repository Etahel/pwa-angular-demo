import {Component, IterableDiffers, OnInit, ViewChild} from '@angular/core';
import {ItemComponent} from "../item/item.component";
import * as _ from "lodash";
import {DatePickerComponent} from "ng2-date-picker";

export type TodoType = {title: string, deadline?: Date, done: boolean};

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {

  @ViewChild('dayPicker') datePicker: DatePickerComponent | undefined;

  _todos : Array<TodoType>

  newToDo : TodoType = {
    title : '',
    deadline: undefined,
    done: false

  }

  todosDiffer : any;

  get todos() : Array<TodoType> {
    return _.orderBy(this._todos, 'deadline')
  }

  constructor(differs : IterableDiffers) {
    let todos = localStorage.getItem('todos');
    this._todos =  JSON.parse(todos ?  todos : '[]' )
    this.todosDiffer = differs.find([]).create();
  }

  ngOnInit(): void {
  }

  doneItems() : number {
    return this.todos.filter(todo => {return todo.done}).length
  }

  toDoItems() : number {
    return this.todos.filter(todo => {return !todo.done}).length
  }

  addTodo() {
    console.log(this.newToDo)
    this._todos.push(this.newToDo)
    this.newToDo = {
      title : '',
      deadline: undefined,
      done: false

    }
  }

  ngDoCheck(): void {
    const changes = this.todosDiffer.diff(this._todos);
    if (changes) {
      this.persistInLocalStorage()
    }
  }

  deleteToDo(todo : TodoType) {
    console.log(todo)
    const todoIndex = this._todos.indexOf(todo);
    this._todos.splice(todoIndex, 1);
  }

  completeToDo(todo : TodoType) {
    console.log(todo)
    // @ts-ignore
    this._todos.find(element => _.isEqual(element, todo)).done = true
    this.persistInLocalStorage()

  }

  persistInLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(this._todos))
  }

}
