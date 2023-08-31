import { Component } from '@angular/core';

@Component({
  selector: 'app-create-thought',
  templateUrl: './create-thought.component.html',
  styleUrls: ['./create-thought.component.scss'],
})
export class CreateThoughtComponent {
  thought = {
    id: '1',
    content: '',
    author: '',
    model: 'modelo1',
  };

  submitForm(e: SubmitEvent) {
    e.preventDefault();
    window.location.href = '/';
  }
}
