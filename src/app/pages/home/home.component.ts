import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Album } from 'src/app/types/album.types';
import { Playlist } from 'src/app/types/playlist.types';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  albums: Album[] = [];
  featuredPlaylists: Playlist[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _dataService: DataService,
    private _changeDetectorRef: ChangeDetectorRef,
    public utils: UtilsService
  ) { }

  ngOnInit(): void {
    this._dataService.albums$.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.albums = response;
      this._changeDetectorRef.markForCheck();
    });

    this._dataService.featuredPlaylists$.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.featuredPlaylists = response;
      this._changeDetectorRef.markForCheck();
    })

    this._dataService.loadNewReleases().subscribe();
    this._dataService.loadFeaturedPlaylists().subscribe();
   
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }


}
