import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Album, AlbumDetail, INewReleases } from '../types/album.types';
import { ArtistsDetail } from '../types/artist.types';
import { OptionsSearch, ResultSearchItems, SearchResult } from '../types/common.types';
import { FeaturedPlaylists, PlaylistDetail } from '../types/playlist.types';
import { Track } from '../types/track.types';

const api = 'https://api.spotify.com/v1';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(
    private _http: HttpClient
  ) { }

  
  getNewReleases(): Observable<INewReleases> {
    return this._http.get<INewReleases>(`${api}/browse/new-releases`);
  }

  getFeaturedPlaylist(): Observable<FeaturedPlaylists> {
    return this._http.get<FeaturedPlaylists>(`${api}/browse/featured-playlists`);
  }

  getSearch(options: OptionsSearch): Observable<SearchResult> {
    let url = `${api}/search?limit=${options.limit}&offset=${options.offset}&q=${options.q}&type=${options.type}`;
    return this._http.get<SearchResult>(url);
  }

  getArtistById(id: string): Observable<ArtistsDetail> {
    return this._http.get<ArtistsDetail>(`${api}/artists/${id}`);
  }

  getTopTracksByArtist(id:string): Observable<{tracks: Track[]}> {
    return this._http.get<{tracks: Track[]}>(`${api}/artists/${id}/top-tracks?country=MX`)
  }

  getAlbumsByArtist(id: string): Observable<ResultSearchItems<Album>> {
    return this._http.get<any>(`${api}/artists/${id}/albums?limit=20&offset=0`);
  }


  getAlbumById(id: string): Observable<AlbumDetail>{
    return this._http.get<AlbumDetail>(`${api}/albums/${id}`);
  }

  getPlaylistById(id: string): Observable<PlaylistDetail> {
    return this._http.get<PlaylistDetail>(`${api}/playlists/${id}`);
  }
}
