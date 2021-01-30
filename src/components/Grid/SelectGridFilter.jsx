import React from 'react';
import { Grid } from 'react-virtualized';
import { rowHeight, columnWidth } from './config';

function GridFilter() {
  function renderFilterCell({ key, style }) {
    return (
      <div key={key} style={style} className="gridFilterCell">
        <input disabled value="" className="textAlignCenter" />
      </div>
    );
  }
  return (
    <Grid
      cellRenderer={renderFilterCell}
      className="gridFilter"
      width={columnWidth}
      height={rowHeight}
      rowHeight={rowHeight}
      columnWidth={columnWidth}
      rowCount={1}
      columnCount={1}
    />
  );
}

export default GridFilter;
