import * as React from 'react';
import { css } from 'emotion';

interface Props {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: Props) => {
  return (
    <button
      className={css`
        border: 0;
        background-color: transparent;
        width: 32px;
        height: 32px;
        border-radius: 32px;
        color: #333;

        &:hover {
          background-color: #eeeeee;
        }

        &:active {
          color: #222;
        }
      `}
      onClick={props.onClick}
    >
      <div>{props.children}</div>
    </button>
  );
};

export default Button;
