import { Component } from '@angular/core';

@Component({
  selector: 'app-list-thoughts',
  templateUrl: './list-thoughts.component.html',
  styleUrls: ['./list-thoughts.component.scss'],
})
export class ListThoughtsComponent {
  thoughtsList = [
    {
      content: 'Estudo de Angular!',
      author: 'Hernande Monteiro',
      model: 'modelo1',
    },
    {
      content: 'Aprendi Angular!',
      author: 'Hernande Monteiro',
      model: 'modelo2',
    },
  ];
}
