import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SpotifyService } from '../providers/spotify.service';
import { Album, AlbumDetail, INewReleases } from '../types/album.types';
import { ArtistsDetail } from '../types/artist.types';
import { OptionsSearch, ResultSearchItems, SearchResult } from '../types/common.types';
import { FeaturedPlaylists, Playlist, PlaylistDetail } from '../types/playlist.types';
import { Track } from '../types/track.types';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private _albums: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);
  private _featuredPlaylists: BehaviorSubject<Playlist[]> = new BehaviorSubject<Playlist[]>([]);

  private _dataSearch: BehaviorSubject<SearchResult> = new BehaviorSubject<SearchResult>(null);
  
  private _artistSelected: BehaviorSubject<ArtistsDetail> = new BehaviorSubject<ArtistsDetail>(null);
  private _topTracksArtist: BehaviorSubject<Track[]> = new BehaviorSubject<Track[]>([]);
  private _albumsByArtist: BehaviorSubject<Album[]> = new BehaviorSubject<Album[]>([]);
  private _trackPlaying: BehaviorSubject<Track> = new BehaviorSubject<Track>(null);
  private _albumSelected: BehaviorSubject<AlbumDetail> = new BehaviorSubject<AlbumDetail>(null);
  private _playlistSelected: BehaviorSubject<PlaylistDetail> = new BehaviorSubject<PlaylistDetail>(null);

  constructor(
    private _spotifyService: SpotifyService
  ) { }


  // getter for albums
  get albums$(): Observable<Album[]> {
    return this._albums.asObservable();
  }

  // getter for featuredPlaylists
  get featuredPlaylists$(): Observable<Playlist[]> {
    return this._featuredPlaylists.asObservable();
  }

  // getter for data search
  get searchItems$(): Observable<SearchResult> {
    return this._dataSearch.asObservable();
  }

  // getter for artist selected
  get artistSelected$(): Observable<ArtistsDetail> {
    return this._artistSelected.asObservable();
  }

  // getter top tracks by artist
  get topTracksArtist$(): Observable<Track[]> {
    return this._topTracksArtist.asObservable();
  }

  // getter for current track 
  get trackPlaying$(): Observable<Track> {
    return this._trackPlaying.asObservable();
  }

  set trackPlaying(track: Track) {
    this._trackPlaying.next(track);
  }

  // gette for albums by artist
  get albumsByArtist$(): Observable<Album[]> {
    return this._albumsByArtist.asObservable();
  }

  // getter for album selected
  get albumSelected$(): Observable<AlbumDetail> {
    return this._albumSelected.asObservable();
  }

  // getter for detail playlist
  get playlistSelected$(): Observable<PlaylistDetail>{
    return this._playlistSelected.asObservable();
  }

  // Get new releases and set on _albumns
  loadNewReleases(): Observable<INewReleases> {
    return this._spotifyService.getNewReleases().pipe(
      tap(response => {
        this._albums.next(response.albums.items)
      })
    )
  }

  // Get featured plalists and set on _fetaturedPlaylists
  loadFeaturedPlaylists(): Observable<FeaturedPlaylists> {
    return this._spotifyService.getFeaturedPlaylist().pipe(
      tap(response => {
        this._featuredPlaylists.next(response.playlists.items);
      })
    )
  }

  loadSearchItems(options: OptionsSearch): Observable<SearchResult> {
    return this._spotifyService.getSearch(options).pipe(
      tap(response => {
        this._dataSearch.next(response);
      })
    )
  }

  loadGetArtistById(id: string): Observable<ArtistsDetail> {
    return this._spotifyService.getArtistById(id).pipe(
      tap(response =>{
        this._artistSelected.next(response);
      })
    )
  }

  loadTopTracksByArtist(id: string): Observable<{tracks: Track[]}> {
    return this._spotifyService.getTopTracksByArtist(id).pipe(
      tap(response => {
        let tracks = response.tracks.sort((a,b) => a.track_number > b.track_number ? 1 : -1);
        this._topTracksArtist.next(tracks);
      })
    )
  }

  loadAlbumsByArtist(id: string): Observable<ResultSearchItems<Album>>{
    return this._spotifyService.getAlbumsByArtist(id).pipe(
      tap(response => {
        let albums = response.items.sort((a,b) => a.release_date > b.release_date ? 1 : -1);
        this._albumsByArtist.next(albums);
      })
    )
  }

  loadAlbumSelected(id: string): Observable<AlbumDetail> {
    return this._spotifyService.getAlbumById(id).pipe(
      tap(response => {
        this._albumSelected.next(response);
      })
    )
  }

  loadPlaylistSelected(id: string) : Observable<PlaylistDetail> {
    return this._spotifyService.getPlaylistById(id).pipe(
      tap(response => {
        response.tracks.items = response.tracks.items.sort((a,b) => a.added_at > b.added_at? 1 : -1);
        this._playlistSelected.next(response);
      })
    );
  }
}
