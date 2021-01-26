import React from 'react';
import PropTypes from 'prop-types';

function Segment({ className = '', children }) {
  return (
    <div className={`relative boxShadow segment ${className}`}>
      <div>
        {children}
      </div>
    </div>
  );
}

Segment.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Segment.defaultProps = {
  className: '',
  children: null,
};

export default Segment;
