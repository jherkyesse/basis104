import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, ScrollSync } from 'react-virtualized';
import useDynamicColumnWidth from './useDynamicColumnWidth';
import SelectGridHeader from './SelectGridHeader';
import SelectGridFilter from './SelectGridFilter';
import SelectGridBody from './SelectGridBody';
import GridHeader from './GridHeader';
import GridFilter from './GridFilter';
import GridBody from './GridBody';
import { rowHeight } from './config';

function Grid({ selectable, filterable, data, height, headerList, onSelect }) {
  const columnCount = headerList.length;
  const columnWidthList = useDynamicColumnWidth({ data, headerList });
  const [filterList, setFilterList] = useState(new Array(columnCount).fill(''));
  const [activeRow, setActiveRow] = useState();
  const [orderType, setOrderType] = useState();
  const [orderKey, setOrderKey] = useState();
  const filterData = useMemo(() => {
    const filterData = data.filter((item) =>
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
    if (orderKey && orderType) {
      filterData.sort((a, b) => {
        if (orderType === 'ascend')
          return (b[orderKey] || '').localeCompare(a[orderKey] || '');
        return (a[orderKey] || '').localeCompare(b[orderKey] || '');
      });
    }
    return filterData;
  }, [data, filterList, orderKey, orderType]);
  console.log('filterData', filterData);
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
        }) => {
          const x = scrollLeft / (scrollWidth - clientWidth);
          const y = scrollTop / (scrollHeight - clientHeight);
          return (
            <>
              {selectable && (
                <div className="selectGridContainer">
                  <SelectGridHeader />
                  {filterable && <SelectGridFilter />}
                  <SelectGridBody
                    data={data}
                    filterData={filterData}
                    scrollTop={scrollTop}
                    height={height}
                    activeRow={activeRow}
                    onSelect={onSelect}
                  />
                </div>
              )}
              <AutoSizer disableHeight>
                {({ width }) => {
                  const bodyWidth = width - 100;
                  return (
                    <>
                      <GridHeader
                        width={bodyWidth}
                        data={headerList}
                        scrollLeft={scrollLeft}
                        columnWidthList={columnWidthList}
                        columnCount={columnCount}
                        orderKey={orderKey}
                        orderType={orderType}
                        setOrderType={setOrderType}
                        setOrderKey={setOrderKey}
                      />
                      {filterable && (
                        <GridFilter
                          width={bodyWidth}
                          data={filterList}
                          setFilterList={setFilterList}
                          scrollLeft={scrollLeft}
                          columnWidthList={columnWidthList}
                          columnCount={columnCount}
                        />
                      )}
                      <GridBody
                        data={filterData}
                        width={bodyWidth}
                        height={height}
                        rowHeight={rowHeight}
                        onScroll={onScroll}
                        columnWidthList={columnWidthList}
                        columnCount={columnCount}
                        headerList={headerList}
                        activeRow={activeRow}
                        setActiveRow={setActiveRow}
                      />
                    </>
                  );
                }}
              </AutoSizer>
            </>
          );
        }}
      </ScrollSync>
    </div>
  );
}

Grid.propTypes = {
  selectable: PropTypes.bool,
  filterable: PropTypes.bool,
  headerList: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  height: PropTypes.number,
  onSelect: PropTypes.func,
};

Grid.defaultProps = {
  selectable: false,
  filterable: false,
  data: [],
  height: 300,
  onSelect: null,
};

export default Grid;
