import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-virtualized';
import { rowHeight, orderColumnWidth } from './config';

function OrderGridHeader({ filterable }) {
  const rowCount = 1 + +filterable;
  const height = rowCount * rowHeight;
  function renderHeaderCell({ key, style }) {
    return (
      <div key={key} style={style} className="orderGridHeaderCell">
        #
      </div>
    );
  }
  return (
    <Grid
      cellRenderer={renderHeaderCell}
      className="orderGridHeader"
      width={orderColumnWidth}
      height={height}
      rowHeight={height}
      columnWidth={orderColumnWidth}
      rowCount={1}
      columnCount={1}
    />
  );
}

OrderGridHeader.propTypes = {
  filterable: PropTypes.bool.isRequired,
};

export default OrderGridHeader;