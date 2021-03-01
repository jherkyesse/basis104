import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-virtualized';
import { rowHeight, orderColumnWidth } from './config';

function OrderGridBody({ filterData, scrollTop, height }) {
  const rowCount = filterData.length;
  function renderBodyCell({ key, rowIndex, style }) {
    const { index } = filterData[rowIndex] || {};
    return (
      <div
        key={key}
        style={style}
        className="orderGridBodyCell"
      >
        <div>{(index ?? 0) + 1}</div>
      </div>
    );
  }
  return (
    <Grid
      className="orderGridBody"
      cellRenderer={renderBodyCell}
      width={orderColumnWidth}
      height={height}
      rowHeight={rowHeight}
      columnWidth={orderColumnWidth}
      scrollTop={scrollTop}
      rowCount={rowCount || 1}
      columnCount={1}
    />
  );
}

OrderGridBody.propTypes = {
  filterData: PropTypes.arrayOf(PropTypes.object),
  scrollTop: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

OrderGridBody.defaultProps = {
  filterData: [],
};

export default OrderGridBody;