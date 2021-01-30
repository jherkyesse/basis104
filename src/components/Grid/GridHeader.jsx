import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-virtualized';
import { rowHeight, columnWidth } from './config';

function GridHeader({ data, scrollLeft, width, columnCount }) {
  function renderHeaderCell({ columnIndex, key, style }) {
    return (
      <div key={key} style={style} className="gridHeaderCell">
        <div>{data[columnIndex]}</div>
      </div>
    );
  }
  return (
    <Grid
      cellRenderer={renderHeaderCell}
      className="gridHeader"
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

GridHeader.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  scrollLeft: PropTypes.number.isRequired,
	width: PropTypes.number.isRequired,
	columnCount: PropTypes.number.isRequired,
};

GridHeader.defaultProps = {
  className: '',
};

export default GridHeader;
