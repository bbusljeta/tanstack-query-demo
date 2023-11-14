'use client';

import { QueryCacheExample } from '@fe/components/QueryCacheExample';
import { TablePageSize } from '@fe/components/TablePageSize';
import { useCompaniesControllerFindAllInfinite } from '@fe/modules/api';
import { useFilterQuery } from '@fe/modules/hooks/useFilterQuery';
import { queryClient } from '@fe/modules/providers/ClientProviders';
import { JsonToTable } from 'react-json-to-table';

export default function CursorPage() {
  const { params, reroute } = useFilterQuery();

  const cursor = Number(params.get('cursor'));
  const pageSize = Number(params.get('pageSize') ?? 10);

  const {
    data: companies,
    fetchNextPage,
    fetchPreviousPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    refetch,
    hasNextPage,
    hasPreviousPage,
  } = useCompaniesControllerFindAllInfinite(
    {
      pageSize,
    },
    {
      query: {
        queryKey: ['companies', cursor, pageSize],
        getNextPageParam: (lastPage) => {
          console.log(lastPage);

          return lastPage.cursor;
        },
      },
    }
  );

  console.log('COMPANIES', companies);

  return (
    <div className="flex flex-col gap-5 max-w-6xl m-auto py-10">
      <div>COMPANIES</div>
      <QueryCacheExample />
      <div>
        <button
          onClick={() => {
            queryClient.invalidateQueries({
              queryKey: ['companies', cursor, pageSize],
            });

            // ignores the cache and refetches data
            refetch();
          }}
          disabled={isLoading || isFetching}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading && 'Loading...'}
          {(isFetching || isFetchingNextPage) && 'Fetching...'}
          {!isLoading && !isFetching && 'Refetch'}
        </button>
      </div>
      <div>
        orval generated:
        <JsonToTable json={companies?.pages} />
        {companies && (
          <div className="flex gap-2 justify-end">
            {hasPreviousPage && (
              <button
                className="border border-gray-700 bg-slate-300 px-6 py-3 rounded-md"
                onClick={() => {
                  fetchPreviousPage();
                }}
              >
                previous
              </button>
            )}
            {hasNextPage && (
              <button
                className="border border-gray-700 bg-slate-300 px-6 py-3 rounded-md"
                onClick={() => {
                  fetchNextPage();
                }}
              >
                next
              </button>
            )}

            <TablePageSize
              currentPageSize={pageSize}
              setPageIndex={(page) => {
                return;
              }}
              setPageSize={(pageSize) => {
                params.set('pageSize', pageSize.toString());
                reroute();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
