import { CellMeasurerCache } from 'react-virtualized';

export const rowHeight = 24;
export const columnWidth = 100;
export const orderColumnWidth = 24;
export const iconSize = 18;
export const contextMenuIconSize = 18;
export const cache = new CellMeasurerCache({
  defaultWidth: columnWidth,
  minWidth: 60,
  fixedHeight: true,
});
