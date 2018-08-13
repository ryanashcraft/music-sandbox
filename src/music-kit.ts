type MusicKitApi = {
  historyHeavyRotation: () => Promise<Array<PlayableObject>>;
  library: {
    albums: () => Promise<Array<Album>>;
    playlists: () => Promise<Array<Playlist>>;
  };
};

type AlbumQueueConfig = {
  album: string;
};

type PlaylistQueueConfig = {
  playlist: string;
};

type QueueConfig = AlbumQueueConfig | PlaylistQueueConfig;

type MusicKitPlayer = {
  addEventListener: (
    eventName: string,
    callback: (args: PlaybackStateChange) => void
  ) => void;
  play: () => Promise<void>;
  pause: () => Promise<void>;
};

type MusicKitInstance = {
  authorize: () => Promise<void>;
  api: MusicKitApi;
  player: MusicKitPlayer;
  setQueue: (data: QueueConfig) => Promise<void>;
};

type MusicKitConfig = {
  developerToken: string;
  app: {
    name: string;
    build: string;
  };
};

interface MusicKitInterface {
  configure: (config: MusicKitConfig) => void;
  getInstance: () => MusicKitInstance;
  PlaybackStates: PlaybackStates;
}

declare const MusicKit: MusicKitInterface;

export type Artwork = {
  url: string;
  height: number;
  width: number;
};

export type PlayParams = {
  id: string;
  kind: 'album';
};

export type AlbumAttributes = {
  artwork: Artwork;
  artistName: string;
  isSingle: boolean;
  url: string;
  isComplete: boolean;
  genreNames: Array<string>;
  trackCount: number;
  isMasteredForItunes: boolean;
  releaseDate: string;
  name: string;
  recordLabel: string;
  copyright: string;
  playParams: PlayParams;
};

export type PlaylistAttributes = {
  url: string;
  curatorName: string;
  playParams: PlayParams;
  playlistType: string;
  name: string;
  artwork: Artwork;
  description: {
    standard: string;
  };
  lastModifiedDate: string;
};

export type Album = {
  id: string;
  type: 'albums';
  href: string;
  attributes: AlbumAttributes;
};

export type Playlist = {
  id: string;
  type: 'playlists';
  href: string;
  attributes: PlaylistAttributes;
};

export type PlayableObject = Album | Playlist;

export type PlaybackStateChange = {
  oldState: number;
  state: number;
};

export enum PlaybackStates {
  none = 0,
  loading = 1,
  playing = 2,
  paused = 3,
  stopped = 4,
  ended = 5,
  seeking = 6,
  waiting = 8,
  stalled = 9,
  completed = 10
}

let _instance: MusicKitInstance | null = null;

export const getInstance = (): Promise<MusicKitInstance> => {
  return new Promise(resolve => {
    if (_instance) {
      resolve(_instance);

      return;
    }

    MusicKit.configure({
      developerToken: process.env.REACT_APP_MUSIC_KIT_DEVELOPER_TOKEN || '',
      app: {
        name: 'Music Sandbox',
        build: '0.0.0'
      }
    });

    try {
      _instance = MusicKit.getInstance();

      resolve(_instance);
    } catch (err) {
      console.debug(err);
    }
  });
};

export const authorize = () => {
  return getInstance().then(instance => instance.authorize());
};

export const queueAlbum = (album: Album) => {
  return getInstance().then(instance => {
    return instance.setQueue({
      album: album.id
    });
  });
};

export const queuePlaylist = (playlist: Playlist) => {
  return getInstance().then(instance => {
    return instance.setQueue({
      playlist: playlist.id
    });
  });
};

export const play = () => {
  return getInstance().then(instance => {
    instance.player.play();
  });
};

export const pause = () => {
  return getInstance().then(instance => {
    instance.player.pause();
  });
};

export const getAlbums = (): Promise<Array<Album>> => {
  return getInstance().then(instance => {
    return instance.api.library.albums();
  });
};

export const getPlaylists = (): Promise<Array<Playlist>> => {
  return getInstance().then(instance => {
    return instance.api.library.playlists();
  });
};

export const getHistoryHeavyRotation = (): Promise<Array<PlayableObject>> => {
  return getInstance().then(instance => {
    return instance.api.historyHeavyRotation();
  });
};

/* Events */

export const onPlaybackStateChange = (
  callback: (change: PlaybackStateChange) => void
) => {
  return getInstance().then(instance => {
    instance.player.addEventListener('playbackStateDidChange', callback);
  });
};
