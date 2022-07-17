import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { DataService } from '../services/data.service';
import { Album, AlbumDetail } from '../types/album.types';
import { ArtistsDetail } from '../types/artist.types';
import { ResultSearchItems } from '../types/common.types';
import { PlaylistDetail } from '../types/playlist.types';
import { Track } from '../types/track.types';

@Injectable({
  providedIn: 'root'
})
export class ArtistResolver implements Resolve<ArtistsDetail> {
  
  constructor(private _router: Router, private _dataService: DataService){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ArtistsDetail> {
    return this._dataService.loadGetArtistById(route.paramMap.get('id'))
    .pipe(
      // Error here means the requested contact is not available
      catchError((error) => {

        // Log the error
        console.error(error);


        // Navigate to there
        this._router.navigate(['/']);

        // Throw an error
        return throwError(() => new Error(error));
      })
  );
    
  }
}

@Injectable({
  providedIn: 'root'
})
export class TopTracksArtistResolver implements Resolve<{tracks: Track[]}> {
  
  constructor(private _router: Router, private _dataService: DataService){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{tracks: Track[]}> {
    return this._dataService.loadTopTracksByArtist(route.paramMap.get('id'))
    .pipe(
      // Error here means the requested contact is not available
      catchError((error) => {

        // Log the error
        console.error(error);
        this._router.navigate(['/']);

        // Throw an error
        return throwError(() => new Error(error));
      })
  );
    
  }
}


@Injectable({
  providedIn: 'root'
})
export class AlbumsByArtistResolver implements Resolve<ResultSearchItems<Album>> {
  
  constructor(private _router: Router, private _dataService: DataService){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ResultSearchItems<Album>> {
    return this._dataService.loadAlbumsByArtist(route.paramMap.get('id'))
    .pipe(
      // Error here means the requested contact is not available
      catchError((error) => {

        // Log the error
        console.error(error);

        this._router.navigate(['/']);

        // Throw an error
        return throwError(() => new Error(error));
      })
  );
    
  }
}

@Injectable({
  providedIn: 'root'
})
export class AlbumsByIdResolver implements Resolve<AlbumDetail> {
  
  constructor(private _router: Router, private _dataService: DataService){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AlbumDetail> {
    return this._dataService.loadAlbumSelected(route.paramMap.get('id'))
    .pipe(
      // Error here means the requested contact is not available
      catchError((error) => {

        // Log the error
        console.error(error);

        this._router.navigate(['/']);

        // Throw an error
        return throwError(() => new Error(error));
      })
  );
    
  }
}


@Injectable({
  providedIn: 'root'
})
export class PlaylistByIdResolver implements Resolve<PlaylistDetail> {
  
  constructor(private _router: Router, private _dataService: DataService){}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PlaylistDetail> {
    return this._dataService.loadPlaylistSelected(route.paramMap.get('id'))
    .pipe(
      // Error here means the requested contact is not available
      catchError((error) => {

        // Log the error
        console.error(error);

        this._router.navigate(['/']);

        // Throw an error
        return throwError(() => new Error(error));
      })
  );
    
  }
}


