import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer } from 'react-virtualized';
import "react-virtualized/styles.css";
import TableRenderer from './TableRenderer';

function Table({ data, headerList, height }) {
  const rowCount = data.length;
  const [columnWidthMap, setColumnWidthMap] = useState(
    headerList.reduce((arr, item) => {
      arr[item] = 1 / rowCount;
      return arr;
    }, {})
  );
  return (
    <AutoSizer disableHeight>
      {({ width }) => (
        <TableRenderer
          columnWidthMap={columnWidthMap}
          setColumnWidthMap={setColumnWidthMap}
          width={width}
          height={height}
          rowCount={rowCount}
          data={data}
          headerList={headerList}
        />
      )}
    </AutoSizer>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  headerList: PropTypes.arrayOf(PropTypes.string).isRequired,
  height: PropTypes.number,
};

Table.defaultProps = {
  data: [],
  height: 500,
};

export default Table;
