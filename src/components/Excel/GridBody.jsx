import React, { useEffect, useRef, useCallback, useState } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Grid, CellMeasurer } from 'react-virtualized';
import { useKeyPressEvent } from 'react-use';
import OutsideClickHandler from 'react-outside-click-handler';
import PerfectScrollbar from 'perfect-scrollbar';
import { activeMap, perfectScrollbarConfig } from 'constants/variables';
import { rowHeight, cache } from './config';
import ContextMenu from './ContextMenu';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

function GridBody({
  data,
  onScroll,
  width,
  height,
  columnCount,
  headerList,
  activeCell,
  setActiveCell,
  onChangeValue,
}) {
  const gridRef = useRef();
  const rowCount = data.length;
  const [isActiveCell, setIsActiveCell] = useState(false);
  const [gridEdit, setGridEdit] = useState(false);
  const [contextMenuData, setContextMenuData] = useState({ open: false });
  const [selectActiveCell, setSelectActiveCell] = useState([]);
  const [
    isSelect,
    fromActiveCellX,
    fromActiveCellY,
    toActiveCellX,
    toActiveCellY,
  ] = selectActiveCell;
  function onOutsideClick() {
    setIsActiveCell(false);
    setSelectActiveCell([false]);
    setContextMenuData({ open: false });
  }
  function keyUp() {
    const { x, y } = activeCell;
    const newY = y > 0 ? y - 1 : 0;
    setActiveCell({ x, y: newY });
    setSelectActiveCell([false, x, newY, x, newY]);
  }
  function keyDown() {
    const { x, y } = activeCell;
    const newY = y === rowCount - 1 ? rowCount - 1 : y + 1;
    setActiveCell({ x, y: newY });
    setSelectActiveCell([false, x, newY, x, newY]);
  }
  function keyRight() {
    const { x, y } = activeCell;
    const newX = x === columnCount - 1 ? columnCount - 1 : x + 1;
    setActiveCell({ x: newX, y });
    setSelectActiveCell([false, newX, y, newX, y]);
  }
  function keyLeft() {
    const { x, y } = activeCell;
    const newX = x === 0 ? 0 : x - 1;
    setActiveCell({ x: newX, y });
    setSelectActiveCell([false, newX, y, newX, y]);
  }
  function getGridFocus() {
    const { x, y } = activeCell;
    const gridScrollContainer = findDOMNode(gridRef.current);
    const gridExcelCell = gridScrollContainer.querySelector(
      `.gridExcelCell[data-grid="${x}-${y}"]`
    );
    if (gridExcelCell) {
      gridExcelCell.focus();
    }
  }
  function getGridBlur() {
    const { x, y } = activeCell;
    const gridScrollContainer = findDOMNode(gridRef.current);
    const gridExcelCell = gridScrollContainer.querySelector(
      `.gridExcelCell[data-grid="${x}-${y}"]`
    );
    if (gridExcelCell) {
      gridExcelCell.blur();
    }
  }
  function selectKeyLeft() {
    if (toActiveCellX === 0) return;
    setSelectActiveCell([
      false,
      fromActiveCellX,
      fromActiveCellY,
      toActiveCellX - 1,
      toActiveCellY,
    ]);
  }
  function selectKeyRight() {
    if (toActiveCellX === columnCount) return;
    setSelectActiveCell([
      false,
      fromActiveCellX,
      fromActiveCellY,
      toActiveCellX + 1,
      toActiveCellY,
    ]);
  }
  function selectKeyUp() {
    if (toActiveCellY === 0) return;
    setSelectActiveCell([
      false,
      fromActiveCellX,
      fromActiveCellY,
      toActiveCellX,
      toActiveCellY - 1,
    ]);
  }
  function selectKeyDown() {
    if (toActiveCellY === rowCount) return;
    setSelectActiveCell([
      false,
      fromActiveCellX,
      fromActiveCellY,
      toActiveCellX,
      toActiveCellY + 1,
    ]);
  }
  useEffect(() => {
    if (gridEdit) getGridFocus();
    else getGridBlur();
  }, [gridEdit]);
  const move = {
    ArrowLeft: keyLeft,
    ArrowRight: keyRight,
    ArrowUp: keyUp,
    ArrowDown: keyDown,
  };
  const moveUpDown = {
    ArrowUp: keyUp,
    ArrowDown: keyDown,
  };
  const moveSelect = {
    ArrowLeft: selectKeyLeft,
    ArrowRight: selectKeyRight,
    ArrowUp: selectKeyUp,
    ArrowDown: selectKeyDown,
  };
  function onKeyDown(e) {
    const { key, code, shiftKey, ctrlKey } = e;
    if (gridEdit && key === 'Escape') setGridEdit(false);
    if (gridEdit) {
      if (moveUpDown[key]) {
        if (shiftKey || ctrlKey) return;
        e.preventDefault();
        e.stopPropagation();
        setSelectActiveCell([false]);
        setGridEdit(false);
        moveUpDown[key]();
        const gridScrollContainer = findDOMNode(gridRef.current);
        gridScrollContainer.focus();
      }
    } else if (move[key]) {
      e.preventDefault();
      e.stopPropagation();
      if (shiftKey) {
        // select multi grid
        moveSelect[key]();
      } else {
        move[key]();
      }
    } else if (code.includes('Key')) setGridEdit(true);
  }
  function onPaste(e) {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  }
  function onContextMenu(e) {
    const { target } = e;
    const [x, y] = (target.getAttribute('data-grid') || '')
      .split('-')
      .map(Number);
    e.preventDefault();
    if (
      (selectActiveCell.length === 5 &&
        !(
          x >= Math.min(fromActiveCellX, toActiveCellX) &&
          x <= Math.max(fromActiveCellX, toActiveCellX) &&
          y >= Math.min(fromActiveCellY, toActiveCellY) &&
          y <= Math.max(fromActiveCellY, toActiveCellY)
        )) ||
      (selectActiveCell.length !== 5 &&
        (x !== activeCell.x || y !== activeCell.y || isActiveCell))
    ) {
      setActiveCell({ x, y });
      if (!isActiveCell) setIsActiveCell(true);
      setSelectActiveCell([false]);
    }
    setGridEdit(false);
    const gridScrollContainer = findDOMNode(gridRef.current);
    const { left, top } = gridScrollContainer.getBoundingClientRect();
    setContextMenuData({
      left: e.clientX - left,
      top: e.clientY - top,
      open: true,
    });
  }
  useEffect(() => {
    const gridScrollContainer = findDOMNode(gridRef.current);
    const ps = new PerfectScrollbar(
      gridScrollContainer,
      perfectScrollbarConfig
    );
    gridScrollContainer.addEventListener('paste', onPaste);
    return () => {
      ps.destroy();
      gridScrollContainer.removeEventListener('paste', onPaste);
    };
  }, []);
  useEffect(() => {
    const gridScrollContainer = findDOMNode(gridRef.current);
    gridScrollContainer.addEventListener('keydown', onKeyDown);
    return () => gridScrollContainer.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);
  useEffect(() => {
    const gridScrollContainer = findDOMNode(gridRef.current);
    gridScrollContainer.addEventListener('contextmenu', onContextMenu);
    return () =>
      gridScrollContainer.removeEventListener('contextmenu', onContextMenu);
  }, [activeCell, selectActiveCell]);
  function renderBodyCell({ parent, columnIndex, key, rowIndex, style }) {
    const rowData = data[rowIndex] || {};
    function onDoubleClick(e) {
      e.preventDefault();
      e.stopPropagation();
      if (!isActiveCell) setIsActiveCell(true);
      setContextMenuData({ open: false });
      setActiveCell({ x: columnIndex, y: rowIndex });
      setGridEdit(true);
    }
    function onBlur({ target }) {
      if (!rowCount) return;
      const { textContent } = target;
      const { index } = data[rowIndex];
      const preData = [...data];
      preData[index] = {
        ...preData[index],
        [headerList[columnIndex]]: textContent,
      };
      onChangeValue(preData);
      cache.clearAll();
    }
    function onMouseDown(e) {
      const { button } = e;
      if (button !== 0) return;
      // e.preventDefault(); // prevent user-select & edit column text select
      e.stopPropagation();
      if (!isActiveCell) setIsActiveCell(true);
      if (
        gridEdit &&
        (columnIndex !== activeCell.x || rowIndex !== activeCell.y)
      ) {
        setGridEdit(false);
      }
      setContextMenuData(false);
      setActiveCell({ x: columnIndex, y: rowIndex });
      setSelectActiveCell([true, columnIndex, rowIndex, columnIndex, rowIndex]);
    }
    function onMouseUp() {
      if (isSelect)
        setSelectActiveCell([
          false,
          fromActiveCellX,
          fromActiveCellY,
          columnIndex,
          rowIndex,
        ]);
    }
    function onMouseEnter(e) {
      if (gridEdit || !isSelect) return;
      setSelectActiveCell([
        true,
        fromActiveCellX,
        fromActiveCellY,
        columnIndex,
        rowIndex,
      ]);
    }
    const { x, y } = activeCell;
    return (
      <CellMeasurer
        columnIndex={columnIndex}
        rowIndex={rowIndex}
        key={key}
        cache={cache}
        parent={parent}
      >
        <div
          role="presentation"
          style={{ ...style, minWidth: style.width }}
          className="gridExcelCell"
          data-grid={`${columnIndex}-${rowIndex}`}
          data-focus={
            isActiveCell && `${x}-${y}` === `${columnIndex}-${rowIndex}`
          }
          // data-content={rowData[headerList[columnIndex]]}
          data-select={
            selectActiveCell.length === 5 &&
            columnIndex >= Math.min(fromActiveCellX, toActiveCellX) &&
            columnIndex <= Math.max(fromActiveCellX, toActiveCellX) &&
            rowIndex >= Math.min(fromActiveCellY, toActiveCellY) &&
            rowIndex <= Math.max(fromActiveCellY, toActiveCellY)
          }
          // onClick={onClick}
          onDoubleClick={onDoubleClick}
          onBlur={onBlur}
          contentEditable={gridEdit}
          suppressContentEditableWarning
          spellCheck={false}
          onKeyDown={null}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onMouseEnter={onMouseEnter}
        >
          {rowData[headerList[columnIndex]]}
        </div>
      </CellMeasurer>
    );
  }
  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      <Grid
        ref={gridRef}
        deferredMeasurementCache={cache}
        className="gridBody gridExcelBody"
        cellRenderer={renderBodyCell}
        width={width}
        height={height}
        rowHeight={rowHeight}
        columnWidth={cache.columnWidth}
        onScroll={onScroll}
        rowCount={rowCount || 1}
        columnCount={columnCount}
        scrollToRow={activeCell.y}
        scrollToColumn={activeCell.x}
      />
      <ContextMenu {...contextMenuData} />
    </OutsideClickHandler>
  );
}

GridBody.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onScroll: PropTypes.func.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  columnCount: PropTypes.number.isRequired,
  headerList: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCell: PropTypes.shape(),
  setActiveCell: PropTypes.func.isRequired,
  onChangeValue: PropTypes.func,
};

GridBody.defaultProps = {
  activeCell: {},
  onChangeValue: null,
};

export default GridBody;
