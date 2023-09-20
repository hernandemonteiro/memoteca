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
  search: string = '';

  constructor(private service: ThoughtsService) {}

  ngOnInit(): void {
    this.service.list(this.currentPage, '').subscribe((thoughts) => {
      this.thoughtsList = thoughts;
      this.checkToShowLoadMoreButton();
    });
  }

  checkToShowLoadMoreButton() {
    this.service.allItems(this.search).subscribe((thoughts) => {
      if (thoughts.length <= this.thoughtsList.length) {
        this.existMoreThoughts = false;
      }
    });
  }

  loadMoreThoughts() {
    this.service.list(++this.currentPage, '').subscribe((thoughts) => {
      this.thoughtsList.push(...thoughts);
      this.checkToShowLoadMoreButton();
    });
  }

  searchThoughts() {
    this.existMoreThoughts = true;
    this.currentPage = 1;
    this.service.list(this.currentPage, this.search).subscribe((thoughts) => {
      this.thoughtsList = thoughts;
      this.checkToShowLoadMoreButton();
    });
  }
}
