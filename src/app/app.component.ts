import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'todoapp2024';
  taskForm = new FormGroup({
    taskName: new FormControl(''),
    taskDate: new FormControl(''),
  })

  addTask(event: Event): void {
    event.preventDefault();
    console.log(this.taskForm.value)
    
    //Reset le formulaire
    this.taskForm.reset()
  }
}
