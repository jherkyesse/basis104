import React from 'react';
import { Grid } from 'react-virtualized';
import { rowHeight, columnWidth } from './config';

function SelectGridHeader() {
  function renderHeaderCell({ key, style }) {
    return (
      <div key={key} style={style} className="selectGridHeaderCell">
        <div>Select</div>
      </div>
    );
  }
  return (
    <Grid
      cellRenderer={renderHeaderCell}
      className="selectGridHeader"
      width={columnWidth}
      height={rowHeight}
      rowHeight={rowHeight}
      columnWidth={columnWidth}
      rowCount={1}
      columnCount={1}
    />
  );
}

export default SelectGridHeader;
