import { ExternalUrls, Followers, Image, Owner, ResultSearchItems } from "./common.types";
import { Track } from "./track.types";


export interface FeaturedPlaylists {
    message:   string;
    playlists: ResultSearchItems<Playlist>;
}

export interface Playlist {
    collaborative: boolean;
    description:   string;
    external_urls: ExternalUrls;
    href:          string;
    id:            string;
    images:        Image[];
    name:          string;
    owner:         Owner;
    primary_color: any;
    public:        null;
    snapshot_id:   string;
    tracks:        TracksPlaylist;
    type:          string;
    uri:           string;
}

export interface TracksPlaylist {
    href: string;
    total: number;
}


export interface PlaylistDetail {
    collaborative: boolean;
    description:   string;
    external_urls: ExternalUrls;
    followers:     Followers;
    href:          string;
    id:            string;
    images:        Image[];
    name:          string;
    owner:         Owner;
    primary_color: null;
    public:        boolean;
    snapshot_id:   string;
    tracks:        ResultSearchItems<TracksItemPlaylist>;
    type:          string;
    uri:           string;
}


export interface TracksItemPlaylist {
    added_at: string;
    added_by: AddedBy;
    is_local: boolean;
    primary_color: string;
    track: Track;
    vide_thumbnail: any;
}

export interface AddedBy {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri:string;
}