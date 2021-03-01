import React from 'react';
import PropTypes from 'prop-types';
import { Grid, CellMeasurer } from 'react-virtualized';
import { rowHeight, cache } from './config';

function GridHeader({
  data,
  headerStyleList,
  scrollLeft,
  width,
  columnCount,
  filterable,
  filterList,
  setFilterList,
}) {
  const rowCount = 1 + +filterable;
  const height = rowCount * rowHeight;

  function renderHeaderCell({ columnIndex, rowIndex, key, style, parent }) {
    const header = data[columnIndex];
    const { background, color, width } = headerStyleList[columnIndex] || {};
    function onChange({ target: { value } }) {
      if (!setFilterList) return;
      const newData = [...filterList];
      newData[columnIndex] = value;
      setFilterList(newData);
    }
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        columnIndex={columnIndex}
        parent={parent}
        rowIndex={rowIndex}
      >
        <div
          style={{ ...style, background, color, width: width || style.width }}
          role="presentation"
          className="gridHeaderCell"
        >
          <div>{header}</div>
          {filterable && (
            <input value={filterList[columnIndex]} onChange={onChange} />
          )}
        </div>
      </CellMeasurer>
    );
  }
  return (
    <Grid
      cellRenderer={renderHeaderCell}
      className="gridHeader"
      width={width}
      height={height}
      rowHeight={height}
      columnWidth={cache.columnWidth}
      deferredMeasurementCache={cache}
      rowCount={1}
      columnCount={columnCount}
      scrollLeft={scrollLeft}
    />
  );
}

GridHeader.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  headerStyleList: PropTypes.arrayOf(
    PropTypes.shape({
      background: PropTypes.string,
      color: PropTypes.string,
    })
  ),
  scrollLeft: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  columnCount: PropTypes.number.isRequired,
  filterable: PropTypes.bool.isRequired,
  filterList: PropTypes.arrayOf(PropTypes.string),
  setFilterList: PropTypes.func,
};

GridHeader.defaultProps = {
  headerStyleList: [],
  filterList: [],
  setFilterList: null,
};

export default GridHeader;
