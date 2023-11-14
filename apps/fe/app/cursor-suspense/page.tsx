'use client';

import { SuspenseExample } from '@fe/components/SuspenseExample';
import { TablePageSize } from '@fe/components/TablePageSize';
import { useCompaniesControllerFindAllSuspenseInfinite } from '@fe/modules/api';
import { useFilterQuery } from '@fe/modules/hooks/useFilterQuery';
import { queryClient } from '@fe/modules/providers/ClientProviders';
import { Suspense } from 'react';
import { JsonToTable } from 'react-json-to-table';

export default function CursorPage() {
  const { params, reroute } = useFilterQuery();

  const cursor = Number(params.get('cursor'));
  const pageSize = Number(params.get('pageSize') ?? 10);

  const {
    data: companies,
    fetchNextPage,
    fetchPreviousPage,
    isFetching,
    isFetchingNextPage,
    refetch,
    hasNextPage,
    hasPreviousPage,
  } = useCompaniesControllerFindAllSuspenseInfinite(
    {
      pageSize,
    },
    {
      query: {
        queryKey: ['companies-suspense', cursor, pageSize],
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
      <Suspense
        fallback={
          <div className="flex flex-col gap-5 max-w-6xl m-auto py-10 bg-gray-400 w-full items-center justify-center">
            LOADING (SUSPENSE)
          </div>
        }
      >
        <SuspenseExample />
      </Suspense>
      <div>
        <button
          onClick={() => {
            queryClient.invalidateQueries({
              queryKey: ['companies-suspense', cursor, pageSize],
            });

            // ignores the cache and refetches data
            refetch();
          }}
          disabled={isFetching}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {(isFetching || isFetchingNextPage) && 'Fetching...'}
          {!isFetching && 'Refetch'}
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
