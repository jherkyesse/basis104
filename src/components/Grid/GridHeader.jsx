import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-virtualized';
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';
import { rowHeight } from './config';

const orderIconMap = {
  ascend: <AiFillCaretUp />,
  descend: <AiFillCaretDown />,
};

function GridHeader({
  data,
  scrollLeft,
  width,
  columnCount,
  columnWidthList,
  orderKey,
  orderType,
  setOrderType,
  setOrderKey,
}) {
  function renderHeaderCell({ columnIndex, key, style }) {
    const header = data[columnIndex];
    const isOrder = orderKey === header;
    function onClick() {
      setOrderType(isOrder && orderType === 'descend' ? 'ascend' : 'descend');
      setOrderKey(header);
    }
    return (
      <div
        key={key}
        style={style}
        role="presentation"
        className="gridHeaderCell"
        onClick={onClick}
      >
        <div>{header}</div>
        {isOrder && orderIconMap[orderType]}
      </div>
    );
  }
  function getColumnWidth({ index }) {
    return columnWidthList[index];
  }
  return (
    <Grid
      cellRenderer={renderHeaderCell}
      className="gridHeader"
      width={width}
      height={rowHeight}
      rowHeight={rowHeight}
      columnWidth={getColumnWidth}
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
  columnWidthList: PropTypes.arrayOf(PropTypes.number).isRequired,
  orderKey: PropTypes.string,
  orderType: PropTypes.string,
  setOrderType: PropTypes.func,
  setOrderKey: PropTypes.func,
};

GridHeader.defaultProps = {
  orderKey: null,
  orderType: null,
  setOrderType: null,
  setOrderKey: null,
};

export default GridHeader;
