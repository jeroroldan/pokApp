import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataAnime } from 'src/app/interfaces/models';
import { AnimeService } from 'src/app/services/anime.service';


export interface NewAnime {
  id: number,
  title:string,
  image:string,
  total_episodes:number,
  watched_episodes:number
}


@Component({
  selector: 'app-result-anime',
  templateUrl: './result-anime.component.html',
  styleUrls: ['./result-anime.component.css']
})
export class ResultAnimeComponent implements OnInit, OnDestroy{

  anime_results: DataAnime[]  = [];
  private destroy$ = new Subject()

  constructor( private animeService: AnimeService ){

  }
  ngOnDestroy(): void {
    this.destroy$.unsubscribe()
    this.destroy$.complete()
  }
  ngOnInit(): void {
    this.animeService.getResultAnime().pipe(
      takeUntil(this.destroy$)
    ).subscribe(results => {
      this.anime_results = results;
    })
  }


  getAnime(){
    this.animeService.getResultAnime().subscribe(data => {
    })
  }

  addAnime(anime: DataAnime){
    const addAnime: NewAnime = {
      id: anime.mal_id,
      title: anime.title,
      image: anime.images['jpg'].image_url,
      total_episodes: anime.episodes || 0,
      watched_episodes: 0

    }

    this.animeService.animeSelected(addAnime);
    this.anime_results = [];
  }

}
