import { Component } from '@angular/core';
import { AnimeService } from 'src/app/services/anime.service';

@Component({
  selector: 'app-search-anime',
  templateUrl: './search-anime.component.html',
  styleUrls: ['./search-anime.component.css']
})
export class SearchAnimeComponent {

  searchTerm: string = '';

  constructor( private animaService: AnimeService ){}




  search(){
    console.log(this.searchTerm);

    this.animaService.getAnimes(this.searchTerm)
      .subscribe(result => {
        console.log(result);
        this.animaService.addResultAnime(result.data)
        this.searchTerm = '';
      })
  }


  



}
