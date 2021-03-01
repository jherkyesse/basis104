import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, ScrollSync } from 'react-virtualized';
import { rowHeight, columnWidth, orderColumnWidth, iconSize } from './config';
import OrderGridHeader from './OrderGridHeader';
import OrderGridBody from './OrderGridBody';
import GridHeader from './GridHeader';
import GridBody from './GridBody';

function Excel({
  data,
  headerList,
  filterable,
  height,
  headerStyleList,
  onChangeValue,
}) {
  const columnCount = headerList.length;
  const mapIndexData = useMemo(
    () => data.map((data, index) => ({ ...data, index })),
    [data]
  );
  const [filterList, setFilterList] = useState(new Array(columnCount).fill(''));
  const [activeCell, setActiveCell] = useState({ x: 0, y: 0 });

  const filterData = useMemo(() => {
    const filterData = mapIndexData.filter((item) =>
      filterList.every((filterValue, index) => {
        const value = item[headerList[index]];
        if (
          !filterValue ||
          (filterValue &&
            (value || '').toLowerCase().includes(filterValue.toLowerCase()))
        )
          return true;
        return false;
      })
    );
    return filterData;
  }, [mapIndexData, filterList]);
  return (
    <div className="gridContainer">
      <ScrollSync>
        {({
          clientHeight,
          clientWidth,
          onScroll,
          scrollHeight,
          scrollLeft,
          scrollTop,
          scrollWidth,
        }) => (
          <>
            <div className="orderExcelContainer">
              <OrderGridHeader filterable={filterable} />
              <OrderGridBody
                filterData={filterData}
                scrollTop={scrollTop}
                height={height}
              />
            </div>
            <AutoSizer disableHeight>
              {({ width }) => {
                const bodyWidth = width - orderColumnWidth;
                return (
                  <>
                    <GridHeader
                      width={bodyWidth}
                      data={headerList}
                      filterable={filterable}
                      filterList={filterList}
                      setFilterList={setFilterList}
                      headerStyleList={headerStyleList}
                      scrollLeft={scrollLeft}
                      columnCount={columnCount}
                    />
                    <GridBody
                      data={filterData}
                      width={bodyWidth}
                      height={height}
                      rowHeight={rowHeight}
                      onScroll={onScroll}
                      columnCount={columnCount}
                      headerList={headerList}
                      activeCell={activeCell}
                      setActiveCell={setActiveCell}
                      onChangeValue={onChangeValue}
                    />
                  </>
                );
              }}
            </AutoSizer>
          </>
        )}
      </ScrollSync>
    </div>
  );
}

Excel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()),
  headerList: PropTypes.arrayOf(PropTypes.string),
  filterable: PropTypes.bool,
  height: PropTypes.number,
  headerStyleList: PropTypes.arrayOf(PropTypes.shape()),
  onChangeValue: PropTypes.func,
};

Excel.defaultProps = {
  data: [],
  headerList: [],
  filterable: true,
  height: 300,
  headerStyleList: [],
  onChangeValue: null,
};

export default Excel;