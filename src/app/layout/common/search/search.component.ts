import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Album } from 'src/app/types/album.types';
import { Artist } from 'src/app/types/artist.types';
import { OptionsSearch, ResultSearchItems } from 'src/app/types/common.types';
import { Playlist } from 'src/app/types/playlist.types';
import { Track } from 'src/app/types/track.types';


@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styles: [
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {

  opened: boolean = false;
  searchControl: FormControl = new FormControl();
  @ViewChild("barSearchInput") barSearchInput: ElementRef;

  albums: ResultSearchItems<Album>;
  artists: ResultSearchItems<Artist>;
  tracks: ResultSearchItems<Track>;
  playlists: ResultSearchItems<Playlist>;

  options: OptionsSearch = {
    limit: 10,
    offset: 0,
    q: "",
    type: 'album,artist,track,playlist'
  }

  mode: 'all' | 'album' | 'artist' | 'track' | 'playlist' = 'artist';


  private _unsubscribeAll: Subject<any> = new Subject();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _dataService: DataService,
    public utils: UtilsService
  ) { }

  ngOnInit(): void {
    this._dataService.searchItems$.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.albums = response?.albums;
      this.tracks = response?.tracks;
      this.artists = response?.artists
      this.playlists = response?.playlists;
      this._changeDetectorRef.markForCheck();
    });

    this.searchControl.valueChanges.pipe(
      takeUntil(this._unsubscribeAll),
      debounceTime(300),
      map(query => {
        if(query) {
          this.options.q = query;
          this.search();
        }
      })
    ).subscribe();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  open() {
    this.opened = true;
    setTimeout(() => {
      this.barSearchInput.nativeElement.focus();
    })
  }

  close(){
    this.opened = false;
    this.albums = null;
    this.artists = null;
    this.tracks = null;
    this.playlists = null;
    this.searchControl.markAsUntouched();
    this.searchControl.setValue("");
    this._changeDetectorRef.markForCheck();
  }

  search() {
    this._dataService.loadSearchItems(this.options).subscribe();
  }

  // Validar si se muestra o no texto
  showNoResultsLabel() {
    if(this.searchControl.touched && !this.albums && !this.artists && !this.playlists && !this.tracks) {
      return true;
    }

    if(this.searchControl.touched && (
      (this.albums && this.albums.items.length === 0) &&
      (this.artists && this.artists.items.length === 0) &&
      (this.tracks && this.tracks.items.length === 0) &&
      (this.playlists && this.playlists.items.length === 0) 
    )) {
      return true;
    }

    return false;

  }

 

  selectedItem() {
    this.close();
  }

  playAudio(track: Track) {
    this._dataService.trackPlaying = track;
  }


}
