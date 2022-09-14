import { Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModalService } from '../modal.service';

interface TODO {
  id: number,
  todo: string,
  done: boolean
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, AfterViewInit {

  serialNumber = 1
  update = false
  todo: TODO | any = {
    id: 0,
    todo: '',
    done: false
  };
  todos: TODO[] = []
  sortedTodos = this.todos.sort((a, b) => a.id > b.id ? 1 : (b.id > a.id) ? -1 : 0)
  deleteId: number = -1

  // inputRef = null
  // @ViewChild('todoInput') todoInput: any = null

  constructor(private modalService: ModalService) {
  }
  ngOnInit(): void {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      this.todos.push(...JSON.parse(savedTodos))
      this.serialNumber = this.sortedTodos[this.sortedTodos.length - 1].id
    }
  }

  ngAfterViewInit(): void {
    // this.inputRef = this.todoInput.nativeElement
  }

  // @HostListener('document:keypress', ['$event'])
  saveTodo(event: KeyboardEvent): void {
    if (!this.todo.todo) return
    if (event.key === 'Enter') {
      if (this.update) {
        this.deleteTodo(this.todo.id)
        this.todos.push({ ...this.todo, id: this.serialNumber, done: false })
      } else {
        this.serialNumber++
        this.todos.push({ ...this.todo, id: this.serialNumber, done: false })
      }
      this.updateLocal()
      this.resetTodoInput()
    }
  }
  
  
  editTodo(id: number) {
    this.todo = this.todos.find((todo) => todo.id === id)
    this.update = true
    this.updateLocal()
  }

  deleteTodo(id: number) {
    this.deleteId = id
    this.modalService.showTextModal('Do you want to delete', 'Delete')
  }
  
  completeDelete() {
    const item = this.todos.find(todo => todo.id === this.deleteId)
    const index = item ? this.todos.indexOf(item) : -1
    this.todos.splice(index, 1)
    this.updateLocal()
    this.deleteId = -1
    this.modalService.closeModal()
  }

  updateStatus(id: number) {
    const item = this.todos.find(todo => todo.id === id)
    item ? item.done = !item.done : null
    this.updateLocal()
  }

  updateLocal() {
    localStorage.setItem('todos', JSON.stringify(this.todos))
  }
  
  resetTodoInput() {
    this.todo = {id:0, todo: ''}
    this.update = false
  }

}
