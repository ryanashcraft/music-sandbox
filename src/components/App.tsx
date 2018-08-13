import * as React from 'react';
import { css } from 'emotion';

import PlayControls from './PlayControls';
import GridView from './GridView';
import Album from './AlbumView';
import Playlist from './PlaylistView';
import * as Text from './Text';

import {
  getHistoryHeavyRotation,
  play,
  pause,
  onPlaybackStateChange
} from '../music-kit';
import AuthorizeButton from './AuthorizeButton';

enum View {
  HeavyRotation,
  Playlists
}

interface State {
  view: View;
  data: Array<MusicKit.PlayableObject>;
  playbackState: number;
}

const columnWidth = 180;

class App extends React.Component<{}, State> {
  state = {
    view: View.HeavyRotation,
    data: [] as Array<MusicKit.PlayableObject>,
    playbackState: 0
  };

  componentDidMount() {
    getHistoryHeavyRotation().then(data => {
      this.setState({
        view: View.HeavyRotation,
        data
      });
    });

    onPlaybackStateChange(this.onPlaybackStateChange);
  }

  onPlaybackStateChange = (stateChange: MusicKit.PlaybackStateChange) => {
    this.setState({
      playbackState: stateChange.state
    });
  };

  render() {
    const { state } = this;

    return (
      <>
        <div
          className={css`
            flex-grow: 1;
            overflow: auto;
            display: flex;
            justify-content: center;
          `}
        >
          <div
            className={css`
              display: flex;
              flex-direction: column;
              flex-grow: 1;
              padding: 12px;
            `}
          >
            <AuthorizeButton />
            <Text.H2>Heavy Rotation</Text.H2>
            <GridView columnWidth={columnWidth}>
              {state.data.map(object => {
                switch (object.type) {
                  case 'playlists':
                    return (
                      <Playlist
                        width={columnWidth}
                        key={object.id}
                        data={object}
                      />
                    );
                  case 'albums':
                    return (
                      <Album
                        width={columnWidth}
                        key={object.id}
                        data={object}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </GridView>
          </div>
        </div>
        <PlayControls
          play={play}
          pause={pause}
          isPlaying={state.playbackState === MusicKit.PlaybackStates.playing}
        />
      </>
    );
  }
}

export default App;
