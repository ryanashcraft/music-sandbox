import * as React from 'react';
import { css } from 'emotion';

interface Props {
  children: Array<React.ReactNode>;
  columnWidth: number;
}

class GridView extends React.Component<Props, {}> {
  render() {
    const { props } = this;
    const { columnWidth } = props;

    return (
      <div
        className={css`
          display: grid;
          grid-template-columns: repeat(
            auto-fit,
            minmax(${columnWidth}px, 1fr)
          );
          grid-gap: 12px;
        `}
      >
        {props.children}
      </div>
    );
  }
}

export default GridView;
