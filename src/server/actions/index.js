import { bindActionCreators } from 'redux';

import * as SocketActions from 'ducks/socket';
import store from '../store';

export default bindActionCreators(
  {
    ...SocketActions
  },
  store.dispatch
);
