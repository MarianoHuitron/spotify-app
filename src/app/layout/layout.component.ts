import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from '../services/data.service';
import { UtilsService } from '../services/utils.service';
import { Track } from '../types/track.types';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject();
  currentTrack: Track;
  previousTrack: Track;
  music: HTMLAudioElement;

  constructor(
    private _dataService: DataService,
    private _changeDetectorRef: ChangeDetectorRef,
    public utils: UtilsService
  ) { }

  ngOnInit(): void {
    this._dataService.trackPlaying$.pipe(takeUntil(this._unsubscribeAll)).subscribe(track => {
      this.previousTrack = this.currentTrack;
      if(track && !this.currentTrack) {
        this.currentTrack = track;
        this.playSong();
        this._changeDetectorRef.markForCheck();
      } else if(track && this.currentTrack) {
        if(track.id == this.currentTrack.id) {
          this.stopSong();
          this.currentTrack = null;
        } else {
          this.currentTrack = track;
          this.stopSong();
          this.playSong();
        }
        this._changeDetectorRef.markForCheck();
      } else {
        this.currentTrack = null;
        this._changeDetectorRef.markForCheck();
        this.stopSong();
      }
    })
  }

  playSong() {
    if(this.music) {
      this.music.pause();
      this.music = null;
    }
    this.music = new Audio(this.currentTrack.preview_url);
    this.music.play();
    this.music.loop = false;
    this.music.playbackRate = 1;
    this.music.onpause = (ev => {
      if(this.music && !this.previousTrack) {
        this._dataService.trackPlaying = null;
      }
    });
   
  }



  stopSong() {
    if(this.music) {
      this.music.pause();
      this.music = null;
    }
  }

  stop() {
    this._dataService.trackPlaying = null;
  }

}
