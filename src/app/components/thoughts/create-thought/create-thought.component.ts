import { ThoughtsService } from './../../../services/thoughts/thoughts.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Thought } from 'src/app/interfaces/iThoughts';

@Component({
  selector: 'app-create-thought',
  templateUrl: './create-thought.component.html',
  styleUrls: ['./create-thought.component.scss'],
})
export class CreateThoughtComponent {
  thought: Thought = {
    content: '',
    author: '',
    model: 'modelo1',
  };

  constructor(private service: ThoughtsService, private router: Router) {}

  submitForm(e: SubmitEvent) {
    e.preventDefault();
    this.service.create(this.thought).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
