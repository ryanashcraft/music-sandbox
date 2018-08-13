import * as React from 'react';
import { css } from 'emotion';

interface Props {
  children: React.ReactNode;
}

export const H2 = (props: Props) => {
  return (
    <h2
      className={css`
        font-size: 2rem;
        font-weight: 800;
        color: #222;
        cursor: default;
        user-select: none;
        margin-bottom: 1rem;
      `}
    >
      {props.children}
    </h2>
  );
};

export const Body = (props: Props) => {
  return (
    <div
      className={css`
        font-size: 1rem;
        font-weight: 300;
        color: #444;
        cursor: default;
        user-select: none;
      `}
    >
      {props.children}
    </div>
  );
};
