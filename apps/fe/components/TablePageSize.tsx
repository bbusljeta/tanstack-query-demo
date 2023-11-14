import clsx from 'clsx';
import React from 'react';

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

interface Props {
  currentPageSize: number;
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (limit: number) => void;
}

export const TablePageSize = ({
  currentPageSize,
  setPageIndex,
  setPageSize,
}: Props) => {
  function handlePageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const pageSize = Number(e.target.value);

    setPageIndex(1);
    setPageSize(pageSize);
  }

  return (
    <div>
      <select
        className={clsx(
          'h-8 w-full rounded-md border border-dropdown-border transition-colors duration-300',
          'placeholder:text-dark-placeholder focus:border-dropdown-border-active focus:outline-none'
        )}
        value={currentPageSize}
        onChange={handlePageSizeChange}
      >
        {PAGE_SIZE_OPTIONS.map((pageSizeOption) => (
          <option key={pageSizeOption} value={pageSizeOption}>
            {pageSizeOption}/page
          </option>
        ))}
      </select>
    </div>
  );
};
