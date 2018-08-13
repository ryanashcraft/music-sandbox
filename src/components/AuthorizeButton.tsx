import * as React from 'react';

import { authorize } from '../music-kit';

interface Props {}

class AuthorizeButton extends React.Component<Props, {}> {
  render() {
    return <button onClick={authorize}>Authorize</button>;
  }
}

export default AuthorizeButton;
