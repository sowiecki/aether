import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as MetaActions from '../../ducks/meta';

import StatsController from './controller';

const mapStateToProps = ({ metaReducer }) => ({
  temperature: metaReducer.temperature
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(MetaActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(StatsController);
