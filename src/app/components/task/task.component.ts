import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import Task from '../../interfaces/task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="task">
      <h3>{{ task.taskName }}</h3>
      <p>
        A faire avant le :
        {{ task.taskDate | date : 'EEEE dd MMMM YYYY' : '' : 'fr-FR' }}
      </p>
      <input
        type="checkbox"
        [id]="task.id"
        (change)="handleTaskState($event)"
      /><label [for]="task.id">{{ isDoneSig() ? 'fait' : 'à faire' }}</label>
    </div>
  `,
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  @Output() onTaskStatusChange: EventEmitter<any> = new EventEmitter()

  isDoneSig = signal<boolean>(false);

  handleTaskState(e: Event) {
    this.isDoneSig.update((status) => !status);
    this.onTaskStatusChange.emit([this.isDoneSig(), this.task.id])
  }
}
