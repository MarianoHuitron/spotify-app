import { Album } from "./album.types";
import { Artist } from "./artist.types";
import { Playlist } from "./playlist.types";
import { Track } from "./track.types";

export interface SearchResult {
    albums?:  ResultSearchItems<Album>;
    artists?: ResultSearchItems<Artist>;
    tracks?:  ResultSearchItems<Track>;
    playlists?: ResultSearchItems<Playlist>;
}

export interface ResultSearchItems<T> {
    href:     string;
    items:    T[];
    limit:    number;
    next:     string;
    offset:   number;
    previous: null;
    total:    number;
}

export interface ExternalUrls {
    spotify: string;
}

export enum ArtistType {
    Artist = "artist",
}

export interface Image {
    height: number;
    url:    string;
    width:  number;
}

export enum ReleaseDatePrecision {
    Day = "day",
}


export interface OptionsSearch {
    limit: number;
    offset: number;
    q: string;
    type: string;
}

export interface Owner {
    display_name:  DisplayName;
    external_urls: ExternalUrls;
    href:          string;
    id:            ID;
    type:          OwnerType;
    uri:           URI;
}

export enum DisplayName {
    Spotify = "Spotify",
}

export enum ID {
    Spotify = "spotify",
}

export enum OwnerType {
    User = "user",
}

export enum URI {
    SpotifyUserSpotify = "spotify:user:spotify",
}

export interface Tracks {
    href:  string;
    total: number;
}

export enum ItemType {
    Playlist = "playlist",
}

export interface Followers {
    href:  null;
    total: number;
}

export interface ExternalIDS {
    isrc: string;
}