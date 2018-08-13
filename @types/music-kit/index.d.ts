declare global {
  export namespace MusicKit {
    type Api = {
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

    type Player = {
      addEventListener: (
        eventName: string,
        callback: (args: PlaybackStateChange) => void
      ) => void;
      play: () => Promise<void>;
      pause: () => Promise<void>;
    };

    type Instance = {
      authorize: () => Promise<void>;
      api: Api;
      player: Player;
      setQueue: (data: QueueConfig) => Promise<void>;
    };

    type Config = {
      developerToken: string;
      app: {
        name: string;
        build: string;
      };
    };

    type Artwork = {
      url: string;
      height: number;
      width: number;
    };

    type PlayParams = {
      id: string;
      kind: 'album';
    };

    type AlbumAttributes = {
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

    type PlaylistAttributes = {
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

    type Album = {
      id: string;
      type: 'albums';
      href: string;
      attributes: AlbumAttributes;
    };

    type Playlist = {
      id: string;
      type: 'playlists';
      href: string;
      attributes: PlaylistAttributes;
    };

    type PlayableObject = Album | Playlist;

    type PlaybackStateChange = {
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

    export const configure: (config: Config) => void;
    export const getInstance: () => Instance;
  }
}

export {};
