import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { AutoSizer, ScrollSync } from 'react-virtualized';
import SelectGridHeader from './SelectGridHeader';
import SelectGridFilter from './SelectGridFilter';
import SelectGridBody from './SelectGridBody';
import GridHeader from './GridHeader';
import GridFilter from './GridFilter';
import GridBody from './GridBody';
import { rowHeight } from './config';

function Grid({ selectable, filterable, data, height, headerList, onSelect }) {
  const columnCount = headerList.length;
  const [filterList, setFilterList] = useState(new Array(columnCount).fill(''));
  const [activeRow, setActiveRow] = useState();
  const filterData = useMemo(
    () =>
      data.filter((item) =>
        filterList.every((filterValue, index) => {
          const value = item[headerList[index]];
          if (!filterValue) return true;
          if (
            filterValue &&
            (value || '').toLowerCase().includes(filterValue.toLowerCase())
          )
            return true;
          return false;
        })
      ),
    [data, filterList]
  );
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
                    scrollTop={scrollTop}
                    height={height}
										activeRow={activeRow}
										onSelect={onSelect}
                  />
                </div>
              )}
              <AutoSizer disableHeight>
                {({ width }) => (
                  <>
                    <GridHeader
                      width={width}
                      data={headerList}
                      scrollLeft={scrollLeft}
                      columnCount={columnCount}
                    />
                    {filterable && (
                      <GridFilter
                        width={width}
                        data={filterList}
                        setFilterList={setFilterList}
                        scrollLeft={scrollLeft}
                        columnCount={columnCount}
                      />
                    )}
                    <GridBody
                      data={filterData}
                      width={width}
                      height={height}
                      rowHeight={rowHeight}
                      onScroll={onScroll}
                      columnCount={columnCount}
                      headerList={headerList}
                      activeRow={activeRow}
                      setActiveRow={setActiveRow}
                    />
                  </>
                )}
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
