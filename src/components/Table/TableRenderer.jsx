import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Column, Table } from 'react-virtualized';
import Draggable from 'react-draggable';
import { useDebounce } from 'react-use';

function TableRenderer({
  columnWidthMap,
  setColumnWidthMap,
  width,
  height,
  rowCount,
  data,
  headerList,
}) {
  function resizeRow({ deltaX, dataKey }) {
    const nextColumnWidthMap = { ...columnWidthMap };
    const percentDelta = deltaX / width;
    const nextDataKey =
      headerList[headerList.findIndex((header) => header === dataKey) + 1];
    nextColumnWidthMap[dataKey] = columnWidthMap[dataKey] + percentDelta;
    if (nextColumnWidthMap[nextDataKey])
      nextColumnWidthMap[nextDataKey] =
        columnWidthMap[nextDataKey] - percentDelta;
    setColumnWidthMap(nextColumnWidthMap);
  }
  function headerRenderer({
    columnData,
    dataKey,
    disableSort,
    label,
    sortBy,
    sortDirection,
  }) {
    return (
      <Fragment key={dataKey}>
        <div className="ReactVirtualized__Table__headerTruncatedText">
          {label}
        </div>
        <Draggable
          axis="x"
          defaultClassName="DragHandle"
          defaultClassNameDragging="DragHandleActive"
          onDrag={(event, { deltaX }) =>
            resizeRow({
              deltaX,
              dataKey,
            })
          }
          position={{ x: 0 }}
          zIndex={999}
        >
          <span className="DragHandleIcon">⋮</span>
        </Draggable>
      </Fragment>
    );
  }
  return (
    <Table
      width={width}
      height={height}
      headerHeight={20}
      rowHeight={30}
      rowCount={rowCount || 1}
      rowGetter={({ index }) => data[index]}
    >
      {headerList.map((header) => (
        <Column
          key={header}
          headerRenderer={headerRenderer}
          dataKey={header?.key || header}
          label={header?.label || header}
          width={columnWidthMap[header] * width}
        />
      ))}
    </Table>
  );
}

TableRenderer.propTypes  = {
	columnWidthMap: PropTypes.shape().isRequired,
  setColumnWidthMap: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  headerList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableRenderer;
