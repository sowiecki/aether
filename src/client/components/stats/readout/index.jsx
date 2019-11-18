import React from 'react';
import PropTypes from 'prop-types';

import stylesGenerator from './styles';

const Readout = ({ label, value, unit }) => {
  const styles = stylesGenerator();

  return (
    <div className={styles.base}>
      {label}: {value}
      {unit}
    </div>
  );
};

Readout.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]).isRequired,
  unit: PropTypes.string
};

Readout.defaultProps = {
  unit: ''
};

export default Readout;
