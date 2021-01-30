import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'react-virtualized';
import { activeMap } from 'constants/variables';
import Checkbox from '../Checkbox';
import { rowHeight, columnWidth } from './config';

function SelectGridBody({ data, scrollTop, height, activeRow, onSelect }) {
  const rowCount = data.length;
  function renderBodyCell({ key, rowIndex, style }) {
    function onChange() {
			if (!onSelect) return;
			const newData = [...data];
			newData[rowIndex] = {
				...newData[rowIndex],
				select: !newData[rowIndex].select,
			}
			onSelect([...newData]);
		}
		const { select } = data[rowIndex];
    return (
      <div key={key} style={style} className={`selectGridBodyCell ${activeMap[activeRow === rowIndex]}`}>
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  scrollTop: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
	activeRow: PropTypes.number,
	onSelect: PropTypes.func,
};

SelectGridBody.defaultProps = {
	activeRow: null,
	onSelect: null,
};

export default SelectGridBody;
