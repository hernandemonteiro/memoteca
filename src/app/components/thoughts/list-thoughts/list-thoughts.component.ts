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
  currentPage: number = 1;
  existMoreThoughts: boolean = true;
  constructor(private service: ThoughtsService) {}

  ngOnInit(): void {
    this.service.list(this.currentPage).subscribe((thoughts) => {
      this.thoughtsList = thoughts;
      this.firstCheckToShowLoadMore();
    });
  }

  firstCheckToShowLoadMore() {
    this.service.allItems().subscribe((thoughts) => {
      if (thoughts.length <= this.thoughtsList.length) {
        this.existMoreThoughts = false;
      }
    });
  }

  loadMoreThoughts() {
    this.service.list(++this.currentPage).subscribe((thoughts) => {
      this.thoughtsList.push(...thoughts);
      if (!thoughts.length) this.existMoreThoughts = false;
    });
  }
}
