import React from 'react';

import stylesGenerator from './styles';

const Header = () => {
  const styles = stylesGenerator();

  return <div className={styles.base}>Aether</div>;
};

export default Header;
