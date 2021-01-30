import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-virtualized';
import { rowHeight, columnWidth } from './config';

function GridFilter({ data, setFilterList, scrollLeft, width, columnCount }) {
  // console.log('data', data)
  function renderFilterCell({ columnIndex, key, style }) {
    function onChange({ target: { value } }) {
      if (!setFilterList) return;
      const newData = [...data];
      newData[columnIndex] = value;
      setFilterList(newData);
    }
    return (
      <div key={key} style={style} className="gridFilterCell">
        <input value={data[columnIndex]} onChange={onChange} />
      </div>
    );
  }
  return (
    <Grid
      cellRenderer={renderFilterCell}
      className="gridFilter"
      width={width}
      height={rowHeight}
      rowHeight={rowHeight}
      columnWidth={columnWidth}
      rowCount={1}
      columnCount={columnCount}
      scrollLeft={scrollLeft}
    />
  );
}

GridFilter.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  scrollLeft: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  columnCount: PropTypes.number.isRequired,
  setFilterList: PropTypes.func,
};

GridFilter.defaultProps = {
  setFilterList: null,
};

export default GridFilter;
