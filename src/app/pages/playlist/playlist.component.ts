import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { UtilsService } from 'src/app/services/utils.service';
import { PlaylistDetail } from 'src/app/types/playlist.types';
import { Track } from 'src/app/types/track.types';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit, OnDestroy {
 
  playlist: PlaylistDetail;

  currentPlaying: any;

  private _unsubscibeAll: Subject<any> = new Subject<any>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _dataService: DataService,
    public utils: UtilsService
  ) { 
  }

  ngOnInit(): void {
    this._dataService.playlistSelected$.pipe(takeUntil(this._unsubscibeAll)).subscribe(playlist => {
      this.playlist = playlist;
      this._changeDetectorRef.markForCheck();
    });
   

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
