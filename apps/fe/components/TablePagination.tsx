import clsx from 'clsx';
import debounce from 'lodash.debounce';
import ReactPaginate from 'react-paginate';

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

interface Props {
  setPageIndex: (pageIndex: number) => void;
  setPageSize: (limit: number) => void;
  currentPageSize: number;
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const TablePagination = ({
  setPageIndex,
  setPageSize,
  currentPageSize,
  currentPage,
  totalPages,
  totalItems,
}: Props) => {
  const debounceInputValue = debounce((value: number) => {
    if (!value || value <= 0 || value > totalPages) return;
    handlePageIndexChange(value);
  }, 500);

  const handlePageIndexChange = debounce((pageIndex: number) => {
    setPageIndex(pageIndex);
  }, 300);

  function handlePageSizeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const pageSize = Number(e.target.value);

    setPageIndex(1);
    setPageSize(pageSize);
  }

  return (
    <div className="m-[15px] flex items-center justify-end gap-8">
      <div>
        <ReactPaginate
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          renderOnZeroPageCount={null}
          breakLabel={'...'}
          forcePage={currentPage - 1}
          pageCount={totalPages}
          disableInitialCallback
          previousLabel={
            <button className="px-4 py-2 rounded-md mr-2 bg-background-skeleton">
              {'<'}
            </button>
          }
          nextLabel={
            <button className="ml-2 px-4 py-2 rounded-md bg-background-skeleton">
              {'>'}
            </button>
          }
          className="flex select-none items-center justify-center [&>*:nth-child(2)]:rounded-l-full [&>*:nth-last-child(2)]:rounded-r-full"
          pageClassName={clsx(
            'bg-white border min-w-[45px] ',
            'first:rounded-l-full last:rounded-r-full',
            'hover:cursor-pointer hover:border-black [&.active]:bg-black [&.active]:text-white'
          )}
          pageLinkClassName="h-full w-full flex items-center justify-center py-2 px-3"
          activeClassName="active"
          breakClassName="bg-white border py-2 px-3"
          onPageChange={(e) => {
            handlePageIndexChange(e.selected + 1);
          }}
        />
      </div>
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
      <div className="flex justify-center gap-[10px] items-center">
        <span>Go to:</span>
        <input
          className="py-3 px-6 rounded-md border border-input-border transition-colors duration-300 bg-input-background-disabled min-w-[50px]"
          type="number"
          min="1"
          max={totalPages}
          onChange={(e) => debounceInputValue(e.target.valueAsNumber)}
        />
      </div>
    </div>
  );
};
