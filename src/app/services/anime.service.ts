import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {  ApiAnimes, DataAnime } from '../interfaces/models';
import { NewAnime } from '../components/result-anime/result-anime.component';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {

  private API_URL= 'https://api.jikan.moe/v4/anime?q=';

  private anime_response$: BehaviorSubject<DataAnime[]> = new BehaviorSubject<any>('')
  private anime_selected$ = new Subject<NewAnime>()

  constructor( private http: HttpClient ) { }




  getAnimes(searchTerm: string): Observable<ApiAnimes>{

    return this.http.get<ApiAnimes>(`${ this.API_URL }${ searchTerm }`)
  }


  addResultAnime( anime: DataAnime[] ) {
    this.anime_response$.next(anime)
  }


  getResultAnime(){
    return this.anime_response$.asObservable()
  }


  animeSelected( anime:NewAnime){
    this.anime_selected$.next(anime);
  }

  getAnimeSelected(): Observable<NewAnime>{
    return this.anime_selected$.asObservable()
  }




}
