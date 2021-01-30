import React from 'react';
import PropTypes from 'prop-types';
import { activeMap } from 'constants/variables';

function Tab({ children, disabled, activeTab, tabKey, onTabClick }) {
  function onClick() {
    if (onTabClick) onTabClick(tabKey);
  }
  return (
    <div
      disabled={disabled}
      role="button"
      className={`tab ${activeMap[activeTab === tabKey]}`}
      onClick={onClick}
      onKeyDown={onClick}
    >
      {children}
    </div>
  );
}

Tab.propTypes = {
  disabled: PropTypes.bool,
  children: PropTypes.node,
  activeTab: PropTypes.string.isRequired,
  tabKey: PropTypes.string.isRequired,
  onTabClick: PropTypes.func,
};

Tab.defaultProps = {
  disabled: false,
  children: null,
  onTabClick: null,
};

export default Tab;
