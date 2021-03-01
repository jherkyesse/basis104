import React, { useState, useRef, useEffect, useMemo } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'perfect-scrollbar';
import { useKeyPressEvent } from 'react-use';
import { AutoSizer, List } from 'react-virtualized';

function DropdownMenu({
  options = [],
  verticalClassName,
  itemValue,
  itemText,
  value,
  onChangeValue,
}) {
  const rowCount = options.length;
  const height = useMemo(() => Math.min(rowCount, 5) * 30, [rowCount]);
  const listRef = useRef();
  const [activeIndex, setActiveIndex] = useState(
    value
      ? options.findIndex((option) => option[itemValue] === value)
      : undefined
  );
  function onKeyUp(e) {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex(activeIndex > 0 ? activeIndex - 1 : options.length - 1);
  }
  function onKeyDown(e) {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex(activeIndex < options.length - 1 ? activeIndex + 1 : 0);
  }
  function onKeyEnter() {
    if (activeIndex === -1 || !activeIndex) return;
    onChangeValue(options[activeIndex][itemValue]);
  }
  useKeyPressEvent('ArrowUp', onKeyUp);
  useKeyPressEvent('ArrowDown', onKeyDown);
  useKeyPressEvent('Enter', onKeyEnter);
  function preventDefault(e) {
    e.preventDefault();
  }
  function onSelect(e, value) {
    e.preventDefault();
    e.stopPropagation();
    onChangeValue(value);
  }
  function rowRenderer({ key, index, style }) {
    const option = options[index];
    function onClick(e) {
      onSelect(e, option[itemValue]);
    }
    return (
      <div
        role="presentation"
        key={key}
        style={{ ...style }}
        className={`selection ${activeIndex === index ? 'active' : ''}`}
        onClick={onClick}
        onMouseDown={preventDefault}
      >
        {option[itemText]}
      </div>
    );
  }
  useEffect(() => {
    const node = findDOMNode(listRef.current);
    const ps = new PerfectScrollbar(node, {
      wheelSpeed: 2,
      wheelPropagation: false,
      minScrollbarLength: 24,
      suppressScrollX: true,
    });
    return () => ps.destroy();
  }, []);
  useEffect(() => {
    const activeIndex = options.findIndex(
      (option) => option[itemValue] === value
    );
    if (activeIndex === -1) return;
    setActiveIndex(activeIndex);
  }, [value]);
  return (
    <div
      className={`selectionContainer w100 absolute left0 ${verticalClassName}`}
      style={{ height }}
    >
      <AutoSizer height>
        {({ width }) => (
          <List
            ref={listRef}
            width={width}
            height={height}
            rowCount={rowCount}
            rowHeight={30}
            rowRenderer={rowRenderer}
            scrollToIndex={activeIndex}
          />
        )}
      </AutoSizer>
    </div>
  );
}

DropdownMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  verticalClassName: PropTypes.string.isRequired,
  itemValue: PropTypes.string.isRequired,
  itemText: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeValue: PropTypes.func,
};

DropdownMenu.defaultProps = {
  value: null,
  onChangeValue: null,
};

export default DropdownMenu;
