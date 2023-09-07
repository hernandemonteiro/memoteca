import { Component } from '@angular/core';
import { Thought } from 'src/app/interfaces/iThoughts';
import { ThoughtsService } from 'src/app/services/thoughts/thoughts.service';

@Component({
  selector: 'app-list-thoughts',
  templateUrl: './list-thoughts.component.html',
  styleUrls: ['./list-thoughts.component.scss'],
})
export class ListThoughtsComponent {
  thoughtsList: Thought[] = [];
  constructor(private service: ThoughtsService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe((thoughts) => {
      this.thoughtsList = thoughts;
    });
  }
}
