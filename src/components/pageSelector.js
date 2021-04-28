import React from 'react';

const PageSelection = ({ rowCount, page, setPage, perPage }) => {
  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    const pageCount = rowCount / perPage - 1;

    if (page < pageCount) {
      setPage(page + 1);
      console.log('trying to set page');
    }
  };

  return (
    <div>
      <button onClick={prevPage} disabled={page <= 0}>Previous Page</button>
      <button onClick={nextPage} disabled={page >= rowCount / perPage - 1}>Next Page</button>
    </div>
  );
};

export default PageSelection;
