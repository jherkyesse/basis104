import React from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';

function TabBar({ data, activeTab, onTabClick }) {
  return (
    <div className="tabBar">
      {data.map((item) => (
        <Tab activeTab={activeTab} disabled={item.disabled} key={item.key} tabKey={item.key} onTabClick={onTabClick}>
          {item.label}
        </Tab>
      ))}
    </div>
  );
}

TabBar.propTypes = {
  activeTab: PropTypes.string.isRequired,
	data: PropTypes.instanceOf(Array),
	onTabClick: PropTypes.func,
};

TabBar.defaultProps = {
	data: [],
	onTabClick: null,
};

export default TabBar;
