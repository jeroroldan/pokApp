import { Component, OnInit } from '@angular/core';
import { AnimeService } from 'src/app/services/anime.service';
import { NewAnime } from '../result-anime/result-anime.component';

@Component({
  selector: 'app-selected-anime',
  templateUrl: './selected-anime.component.html',
  styleUrls: ['./selected-anime.component.css']
})
export class SelectedAnimeComponent implements OnInit {
  anime_selected:NewAnime[] = [];

  constructor( private animeteService: AnimeService ){

  }
  ngOnInit(): void {
    const localValue = JSON.parse(localStorage.getItem('myAnime') || '')
    this.anime_selected = localValue;

    this.animeteService.getAnimeSelected().subscribe(result => {
      this.anime_selected.push(result)
      localStorage.setItem('myAnime',JSON.stringify(this.anime_selected))
    })
  }
  
  increaseWatch(anime:NewAnime){
    anime.watched_episodes++;
    localStorage.setItem('myAnime',JSON.stringify(this.anime_selected))
  }

  decrementWatch(anime: NewAnime){
    anime.watched_episodes--;
    localStorage.setItem('myAnime',JSON.stringify(this.anime_selected))
  }
}
