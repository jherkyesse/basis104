import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-virtualized';
import { activeMap } from 'constants/variables';
import { rowHeight, columnWidth } from './config';

function GridBody({
  data,
  onScroll,
  width,
  height,
  columnCount,
  headerList,
  activeRow,
  setActiveRow,
  columnWidthList,
}) {
  const rowCount = data.length;
  function renderBodyCell({ columnIndex, key, rowIndex, style }) {
    function onClick(e) {
      e.preventDefault();
      e.stopPropagation();
      setActiveRow(activeRow === rowIndex ? null : rowIndex);
    }
    return (
      <div
        key={key}
        role="presentation"
        style={style}
        className={`gridBodyCell ${activeMap[activeRow === rowIndex]}`}
        onClick={onClick}
        onKeyDown={null}
      >
        <div>{data[rowIndex][headerList[[columnIndex]]]}</div>
      </div>
    );
	}
	function getColumnWidth({ index }) {
		return columnWidthList[index];
	}
  return (
    <Grid
      className="gridBody"
      cellRenderer={renderBodyCell}
      width={width}
      height={height}
      rowHeight={rowHeight}
      columnWidth={getColumnWidth}
      onScroll={onScroll}
      rowCount={rowCount}
      columnCount={columnCount}
    />
  );
}

GridBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onScroll: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  columnCount: PropTypes.number.isRequired,
  headerList: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeRow: PropTypes.number,
  setActiveRow: PropTypes.func.isRequired,
  columnWidthList: PropTypes.arrayOf(PropTypes.number).isRequired,
};

GridBody.defaultProps = {
  activeRow: null,
};

export default GridBody;
