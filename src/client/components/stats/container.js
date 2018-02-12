import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../ducks';

import StatsController from './controller';

const mapStateToProps = ({ metaReducer }) => ({
  connected: metaReducer.connected,
  temperature: metaReducer.temperature
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsController);
