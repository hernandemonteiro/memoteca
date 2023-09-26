import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
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
  favorites = false;
  title: string = 'Meu Mural';

  favoriteList: Thought[] = [];

  constructor(
    private service: ThoughtsService,
    private route: RouteReuseStrategy,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.service
      .list(this.currentPage, '', this.favorites)
      .subscribe((thoughts) => {
        this.thoughtsList = thoughts;
        this.checkToShowLoadMoreButton();
      });

    this.titleService.setTitle('Meu Mural');
  }

  reloadComponent() {
    this.favorites = false;
    this.currentPage = 1;
    this.route.shouldReuseRoute = () => false;
  }

  checkToShowLoadMoreButton() {
    this.service.allItems(this.search, this.favorites).subscribe((thoughts) => {
      if (thoughts.length <= this.thoughtsList.length) {
        this.existMoreThoughts = false;
      }
    });
  }

  loadMoreThoughts() {
    this.service
      .list(++this.currentPage, '', this.favorites)
      .subscribe((thoughts) => {
        this.thoughtsList.push(...thoughts);
        this.checkToShowLoadMoreButton();
      });
  }

  searchThoughts() {
    this.currentPage = 1;
    this.service
      .list(this.currentPage, this.search, this.favorites)
      .subscribe((thoughts) => {
        this.thoughtsList = thoughts;
        this.checkToShowLoadMoreButton();
      });
  }

  listFavorites() {
    this.title = 'Meus Favoritos';
    this.titleService.setTitle('Meus Favoritos');
    this.currentPage = 1;
    this.favorites = true;

    this.service
      .list(this.currentPage, this.search, this.favorites)
      .subscribe((thoughts) => {
        this.thoughtsList = thoughts;
        this.favoriteList = thoughts;
        this.checkToShowLoadMoreButton();
      });
  }
}
