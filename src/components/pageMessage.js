import React from 'react';

const PageMessage = ({ page, perPage, rowCount }) => {
  const start = page * perPage + 1;
  const end = (page + 1) * perPage;
  const displayEnd = end < rowCount
    ? end
    : rowCount;
  return (
    <div>
      <p>Showing {start}-{displayEnd} of {rowCount} routes.</p>
    </div>
  )
};

export default PageMessage;
