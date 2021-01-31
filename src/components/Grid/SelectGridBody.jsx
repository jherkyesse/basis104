import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-virtualized';
import { isEqualWith } from 'lodash';
import { activeMap } from 'constants/variables';
import Checkbox from '../Checkbox';
import { rowHeight, columnWidth } from './config';

function SelectGridBody({
  data,
  filterData,
  scrollTop,
  height,
  activeRow,
  onSelect,
}) {
  const rowCount = filterData.length;
  function renderBodyCell({ key, rowIndex, style }) {
    function onChange() {
      if (!onSelect) return;
      const newData = [...data];
      const index = data.findIndex((item) =>
        isEqualWith(item, filterData[rowIndex])
      );
      newData[index] = {
        ...newData[index],
        select: !newData[index].select,
      };
      onSelect([...newData]);
    }
    const { select } = filterData[rowIndex];
    return (
      <div
        key={key}
        style={style}
        className={`selectGridBodyCell ${activeMap[activeRow === rowIndex]}`}
      >
        <Checkbox onChange={onChange} checked={select} />
      </div>
    );
  }
  return (
    <Grid
      className="selectGridBody"
      cellRenderer={renderBodyCell}
      width={columnWidth}
      height={height}
      rowHeight={rowHeight}
      columnWidth={columnWidth}
      scrollTop={scrollTop}
      rowCount={rowCount}
      columnCount={1}
    />
  );
}

SelectGridBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  filterData: PropTypes.arrayOf(PropTypes.object),
  scrollTop: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  activeRow: PropTypes.number,
  onSelect: PropTypes.func,
};

SelectGridBody.defaultProps = {
  data: [],
  filterData: [],
  activeRow: null,
  onSelect: null,
};

export default SelectGridBody;
