import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { HomeComponent } from './home/home.component';
import { AlbumsByArtistResolver, AlbumsByIdResolver, ArtistResolver, PlaylistByIdResolver, TopTracksArtistResolver } from './pages.resolver';
import { PlaylistComponent } from './playlist/playlist.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'artist/:id',
    component: ArtistComponent,
    resolve: {
      artist: ArtistResolver,
      topTracks: TopTracksArtistResolver,
      albums: AlbumsByArtistResolver
    }
  },
  {
    path: 'album/:id',
    component: AlbumComponent,
    resolve: {
      album: AlbumsByIdResolver
    }
  },
  {
    path: 'playlist/:id',
    component: PlaylistComponent,
    resolve: {
      playlist: PlaylistByIdResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
