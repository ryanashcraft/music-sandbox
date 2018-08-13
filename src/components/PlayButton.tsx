import * as React from 'react';

import Button from './Button';

interface Props {
  play: () => void;
  pause: () => void;
  isPlaying: boolean;
}

class PlayButton extends React.Component<Props, {}> {
  render() {
    const { props } = this;

    return (
      <Button onClick={props.isPlaying ? props.pause : props.play}>
        {props.isPlaying ? (
          <span className="fas fa-pause" />
        ) : (
          <span className="fas fa-play" />
        )}
      </Button>
    );
  }
}

export default PlayButton;
