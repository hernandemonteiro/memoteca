import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Thought } from 'src/app/interfaces/iThoughts';
import { ThoughtsService } from 'src/app/services/thoughts/thoughts.service';

@Component({
  selector: 'app-edit-thought',
  templateUrl: './edit-thought.component.html',
  styleUrls: ['./edit-thought.component.scss'],
})
export class EditThoughtComponent {
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
    this.service.searchByID(parseInt(id!)).subscribe((thought) => {
      this.thought = thought;
    });
  }

  changeThought() {
    this.service.edit(this.thought).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
