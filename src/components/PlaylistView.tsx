import * as React from 'react';
import { css } from 'emotion';

import ArtworkView from './ArtworkView';
import { Playlist, queuePlaylist, play } from '../music-kit';
import * as Text from './Text';

interface Props {
  data: Playlist;
  width: number;
}

class PlaylistView extends React.Component<Props, {}> {
  onClick = () => {
    const { props } = this;

    queuePlaylist(props.data).then(play);
  };

  render() {
    const { props } = this;

    return (
      <div
        className={css`
          cursor: pointer;
        `}
        onClick={this.onClick}
      >
        <ArtworkView
          data={props.data.attributes.artwork}
          width={props.width}
          height={props.width}
        />
        <Text.Body>{props.data.attributes.name}</Text.Body>
      </div>
    );
  }
}

export default PlaylistView;
