import * as React from 'react';
import { css } from 'emotion';
import AutoSizer from 'react-virtualized-auto-sizer';

interface Props {
  data: MusicKit.Artwork;
  onClick?: (e: React.MouseEvent<HTMLImageElement>) => void;
  height: number;
  width: number;
}

class ArtworkView extends React.Component<Props, {}> {
  render() {
    const { props } = this;
    const url = props.data.url
      .replace('{w}', `${props.width * 2}`)
      .replace('{h}', `${props.height * 2}`);

    return (
      <AutoSizer disableHeight={true}>
        {({ width }: { width: number }) => (
          <div
            className={css`
              width: ${width}px;
              height: ${width}px;
              min-height: ${width}px;
              position: relative;
              background-image: url(${url});
              background-repeat: no-repeat;
              background-size: cover;
              border-radius: 3px;
              margin-bottom: 4px;
              box-shadow: inset 0 -1px 3px 1px rgba(0, 0, 0, 0.08);

              &:hover {
                &::before {
                  content: '';
                  display: flex;
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background-color: rgba(0, 0, 0, 0.3);
                  border-radius: 3px;
                }
              }
            `}
          />
        )}
      </AutoSizer>
    );
  }
}

export default ArtworkView;
