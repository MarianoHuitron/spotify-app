import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Album } from 'src/app/types/album.types';
import { ArtistsDetail } from 'src/app/types/artist.types';
import { Track } from 'src/app/types/track.types';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistComponent implements OnInit, OnDestroy {

  artist: ArtistsDetail;
  tracks: Track[] = [];
  albums: Album[] = [];

  currentPlaying: Track;

  private _unsubscibeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _dataService: DataService,
    public utils: UtilsService
  ) { 
  }

  ngOnInit(): void {
    this._dataService.artistSelected$.pipe(takeUntil(this._unsubscibeAll)).subscribe(artist => {
      this.artist = artist;
      this._changeDetectorRef.markForCheck();
    });

    this._dataService.topTracksArtist$.pipe(takeUntil(this._unsubscibeAll)).subscribe(topTracks => {
      this.tracks = topTracks;
      this._changeDetectorRef.markForCheck();
    });

    this._dataService.albumsByArtist$.pipe(takeUntil(this._unsubscibeAll)).subscribe(albums => {
      this.albums = albums;
      this._changeDetectorRef.markForCheck();
    })

    this._dataService.trackPlaying$.pipe(takeUntil(this._unsubscibeAll)).subscribe(playing => {
      if(this.currentPlaying?.id === playing?.id) {
        this.currentPlaying = null;
      } else {
        this.currentPlaying = playing;
      }
      this._changeDetectorRef.markForCheck();
    });

  }

  ngOnDestroy(): void {
    this._unsubscibeAll.next(null);
    this._unsubscibeAll.complete();
  }


  playAudio(track: Track) {
    this._dataService.trackPlaying = track;
  }

}
