import * as React from 'react';
import { css } from 'emotion';

import PlayButton from './PlayButton';

interface Props {
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
}

class PlayControls extends React.Component<Props, {}> {
  render() {
    const { props } = this;

    return (
      <div
        className={css`
          display: flex;
          flex-shrink: 0;
          justify-content: center;
          border-top: 1px solid #eeeeee;
          background-color: #fafafa;
          padding: 12px;
        `}
      >
        <PlayButton
          play={props.play}
          pause={props.pause}
          isPlaying={props.isPlaying}
        />
      </div>
    );
  }
}

export default PlayControls;
