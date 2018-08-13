import * as React from 'react';
import { css } from 'emotion';

import ArtworkView from './ArtworkView';
import { Album, queueAlbum, play } from '../music-kit';
import * as Text from './Text';

interface Props {
  data: Album;
  width: number;
}

class AlbumView extends React.Component<Props, {}> {
  render() {
    const { props } = this;

    return (
      <div
        className={css`
          cursor: pointer;
        `}
        onClick={() => queueAlbum(props.data).then(play)}
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

export default AlbumView;
