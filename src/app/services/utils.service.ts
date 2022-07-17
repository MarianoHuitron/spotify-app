import { Injectable } from '@angular/core';
import { Artist } from '../types/artist.types';
import { Image } from '../types/common.types';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() { }

  getArtists(artists: Artist[]): string {
    let artistsNames = '';
    artistsNames = artists.map(at => at.name).join(', ');
    return artistsNames;
  }

  getDuration(duration: number): string {
    let seconds = duration / 1000;
    let minuts = seconds /60;
    return minuts.toFixed(2);
  }

  getImage(images: Image[]): string {
    if(images && images.length) {
      return images[0].url;
    }
    return "/assets/no-image.png";
  }
}
