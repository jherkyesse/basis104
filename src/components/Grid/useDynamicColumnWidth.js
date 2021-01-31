import { useMemo } from 'react';
import PropTypes from 'prop-types';

function useDynamicColumnWidth({ data, headerList }) {
  const columnMaxLengthList = useMemo(
    () =>
      data.reduce((acc, item) => {
        headerList.forEach((header, index) => {
          if ((acc[index] || '').length < (item[header] || '').length)
            acc[index] = item[header];
        });
        return acc;
      }, [...headerList]),
    [data]
  );
  function calculateWidth(value) {
    return value.length * 12;
  }
  return columnMaxLengthList.map(calculateWidth);
}

useDynamicColumnWidth.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  headerList: PropTypes.arrayOf(PropTypes.string).isRequire,
};

useDynamicColumnWidth.defaultProps = {
  data: null,
};

export default useDynamicColumnWidth;
