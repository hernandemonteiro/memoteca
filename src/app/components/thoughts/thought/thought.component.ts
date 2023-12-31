import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Thought } from 'src/app/interfaces/iThoughts';
import { ThoughtsService } from 'src/app/services/thoughts/thoughts.service';

@Component({
  selector: 'app-thought',
  templateUrl: './thought.component.html',
  styleUrls: ['./thought.component.scss'],
})
export class ThoughtComponent {
  @Input() thought: Thought = {
    id: 0,
    content: '',
    author: '',
    model: 'modelo1',
    favorite: false,
  };

  @Input() favoriteList: Thought[] = [];

  constructor(private service: ThoughtsService, private router: Router) {}

  widthThought(): string {
    if (this.thought.content.length >= 256) {
      return 'pensagemento-g';
    }
    return 'pensamento-p';
  }

  changeFavorite() {
    this.service.changeFavorite(this.thought).subscribe(() => {
      this.favoriteList.splice(this.favoriteList.indexOf(this.thought), 1);
    });
  }
}
