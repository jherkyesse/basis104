import React from 'react';
import PropTypes from 'prop-types';

function Container({ className = '', children }) {
  return (
    <div className={`relative flexColumn w100 container ${className}`}>
      {children}
    </div>
  );
}

Container.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Container.defaultProps = {
  className: '',
  children: null,
};

export default Container;
