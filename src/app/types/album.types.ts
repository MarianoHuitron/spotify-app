import { Artist } from "./artist.types";
import { ExternalIDS, ExternalUrls, Image, ResultSearchItems } from "./common.types";
import { Track } from "./track.types";

export interface Album {
    album_group:            string;
    album_type:             string;
    artists:                Artist[];
    available_markets:      string[];
    external_urls:          ExternalUrls;
    href:                   string;
    id:                     string;
    images:                 Image[];
    name:                   string;
    release_date:           Date;
    release_date_precision: string;
    total_tracks:           number;
    type:                   string;
    uri:                    string;
}

export interface AlbumDetail {
    album_type:             string;
    artists:                Artist[];
    available_markets:      string[];
    copyrights:             Copyright[];
    external_ids:           ExternalIDS;
    external_urls:          ExternalUrls;
    genres:                 any[];
    href:                   string;
    id:                     string;
    images:                 Image[];
    label:                  string;
    name:                   string;
    popularity:             number;
    release_date:           Date;
    release_date_precision: string;
    total_tracks:           number;
    tracks:                 ResultSearchItems<Track>;
    type:                   string;
    uri:                    string;
}


export enum AlbumTypeEnum {
    Album = "album",
    Single = "single",
}

export interface INewReleases {
    albums: ResultSearchItems<Album>;
}

export interface Copyright {
    text: string;
    type: string;
}