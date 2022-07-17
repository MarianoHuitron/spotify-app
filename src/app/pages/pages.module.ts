import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { PlaylistComponent } from './playlist/playlist.component';


@NgModule({
  declarations: [
    HomeComponent,
    ArtistComponent,
    AlbumComponent,
    PlaylistComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class PagesModule { }
