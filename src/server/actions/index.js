import { bindActionCreators } from 'redux';

import store from 'config/store';
import * as SocketActions from 'ducks/socket';
import * as TemperatureActions from 'ducks/temperature';

export default bindActionCreators(
  {
    ...SocketActions,
    ...TemperatureActions
  },
  store.dispatch
);
