let _instance: MusicKit.Instance | null = null;

export const getInstance = (): Promise<MusicKit.Instance> => {
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

export const queueAlbum = (album: MusicKit.Album) => {
  return getInstance().then(instance => {
    return instance.setQueue({
      album: album.id
    });
  });
};

export const queuePlaylist = (playlist: MusicKit.Playlist) => {
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

export const getAlbums = (): Promise<Array<MusicKit.Album>> => {
  return getInstance().then(instance => {
    return instance.api.library.albums();
  });
};

export const getPlaylists = (): Promise<Array<MusicKit.Playlist>> => {
  return getInstance().then(instance => {
    return instance.api.library.playlists();
  });
};

export const getHistoryHeavyRotation = (): Promise<
  Array<MusicKit.PlayableObject>
> => {
  return getInstance().then(instance => {
    return instance.api.historyHeavyRotation();
  });
};

/* Events */

export const onPlaybackStateChange = (
  callback: (change: MusicKit.PlaybackStateChange) => void
) => {
  return getInstance().then(instance => {
    instance.player.addEventListener('playbackStateDidChange', callback);
  });
};
