import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Thought } from 'src/app/interfaces/iThoughts';
import { ThoughtsService } from 'src/app/services/thoughts/thoughts.service';

@Component({
  selector: 'app-delete-thought',
  templateUrl: './delete-thought.component.html',
  styleUrls: ['./delete-thought.component.scss'],
})
export class DeleteThoughtComponent {
  thought: Thought = {
    id: 0,
    content: '',
    author: '',
    model: 'modelo1',
  };

  constructor(
    private service: ThoughtsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.service.searchByID(parseInt(id!)).subscribe((thought: Thought) => {
      this.thought = thought;
    });
  }

  deleteThought() {
    this.service.delete(this.thought.id as number).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
