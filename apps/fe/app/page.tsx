'use client';

import { QueryCacheExample } from '@fe/components/QueryCacheExample';
import { TablePagination } from '@fe/components/TablePagination';
import {
  AccountDto,
  AccountsControllerFindAllParams,
  useAccountsControllerFindAll,
} from '@fe/modules/api';
import { customClient } from '@fe/modules/api/custom-client';
import { useFilterQuery } from '@fe/modules/hooks/useFilterQuery';
import { queryClient } from '@fe/modules/providers/ClientProviders';
import { useQuery } from '@tanstack/react-query';
import { JsonToTable } from 'react-json-to-table';

export default function Index() {
  const { params, reroute } = useFilterQuery();

  const page = Number(params.get('page') ?? 1);
  const pageSize = Number(params.get('pageSize') ?? 10);

  const {
    data: accounts,
    refetch: refetchOrval,
    isLoading,
    isFetching,
  } = useAccountsControllerFindAll(
    {
      page,
      pageSize,
    },
    {
      query: {
        queryKey: ['accounts', page, pageSize],
      },
    }
  );

  const { data: accountsPure } = useQuery({
    enabled: false,
    queryKey: ['accounts_pure', page, pageSize],
    queryFn: ({ queryKey, meta, signal }) => {
      return customClient<AccountDto[]>({
        url: `/v1/accounts`,
        method: 'get',
        signal,
        params: {
          page,
          pageSize,
        } as AccountsControllerFindAllParams,
        paramsSerializer: (params) => {
          return Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        },
      });
    },
  });

  return (
    <div className="flex flex-col gap-5 max-w-6xl m-auto py-10">
      <div>ACCOUNTS</div>
      <QueryCacheExample />
      <div>
        <button
          onClick={() => {
            queryClient.invalidateQueries({
              queryKey: ['accounts', page, pageSize],
            });

            // ignores the cache and refetches data
            refetchOrval();
          }}
          disabled={isLoading || isFetching}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading && 'Loading...'}
          {isFetching && 'Fetching...'}
          {!isLoading && !isFetching && 'Refetch'}
        </button>
      </div>
      <div>
        orval generated:
        <JsonToTable json={accounts} />
        {accounts && (
          <TablePagination
            setPageIndex={(page) => {
              params.set('page', page.toString());
              reroute();
            }}
            setPageSize={(pageSize) => {
              params.set('pageSize', pageSize.toString());
              reroute();
            }}
            currentPage={page}
            currentPageSize={pageSize}
            totalPages={accounts.totalPages}
            totalItems={accounts.totalRows}
          />
        )}
      </div>
      {/* <div>
        pure tanstack:
        <JsonToTable json={accountsPure} />
      </div> */}
    </div>
  );
}
