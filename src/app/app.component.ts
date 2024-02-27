import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { TasksService } from './services/tasks.service';
import Task from './interfaces/task';
import { TaskComponent } from './components/task/task.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, TaskComponent],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.tasks = this.taskService.readTasks();
    console.log({ task: this.tasks });
  }
  title = 'todoapp2024';
  taskForm = new FormGroup({
    taskName: new FormControl(''),
    taskDate: new FormControl(''),
  });

  private taskService = inject(TasksService);
  tasks: Task[] = [];

  addTask(event: Event): void {
    event.preventDefault();
    //console.log(this.taskForm.value);
    const taskName = this.taskForm.value.taskName;
    const taskDate = this.taskForm.value.taskDate;

    this.taskService.createTask(taskName!, taskDate!);
    this.tasks = this.taskService.readTasks();

    //Reset le formulaire
    this.taskForm.reset();
  }

  updateTaskStatus(status: boolean, id: string) {
    this.taskService.updateTaskStatus(status, id);
    this.tasks = this.taskService.readTasks();
  }
}
