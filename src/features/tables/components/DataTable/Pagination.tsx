import React from 'react';
import PageSizeSelect from './PageSizeSelect';
import PageLinks from './PageLinks';

type PaginationProps = {
  pageSize: number;
  pageIndex: number;
  totalItems: number;
  onPageSizeChanged: Function;
  onPageChanged: Function;
};

function Pagination({ pageSize, pageIndex, totalItems, onPageSizeChanged, onPageChanged }: PaginationProps) {
  const pageCount = Math.ceil(totalItems / pageSize);

  return (
    <div className="row justify-content-center justify-content-sm-between align-items-sm-center">
      <div className="col-sm mb-2 mb-sm-0">
        <PageSizeSelect pageSize={pageSize} totalItems={totalItems} onPageSizeChanged={onPageSizeChanged} />
      </div>
      <div className="col-sm-auto">
        <PageLinks pageIndex={pageIndex} pageCount={pageCount} onPageChanged={onPageChanged} />
      </div>
    </div>
  );
}

export default Pagination;
