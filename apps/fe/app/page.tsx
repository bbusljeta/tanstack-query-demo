'use client';

import { QueryCacheExample } from '@fe/app/(components)/QueryCacheExample';
import {
  AccountDto,
  AccountsControllerFindAllParams,
  useAccountsControllerFindAll,
} from '@fe/modules/api';
import { customClient } from '@fe/modules/api/custom-client';
import { queryClient } from '@fe/modules/providers/ClientProviders';
import { useQuery } from '@tanstack/react-query';
import { JsonToTable } from 'react-json-to-table';

export default function Index() {
  const { data: accounts } = useAccountsControllerFindAll(
    {
      page: 1,
      pageSize: 10,
    },
    {
      query: {
        queryKey: ['accounts'],
      },
    }
  );

  const {
    data: accountsPure,
    isLoading,
    isFetching,
    refetch,
  } = useQuery({
    enabled: false,
    queryKey: ['accounts_pure'],
    queryFn: ({ queryKey, meta, signal }) => {
      return customClient<AccountDto[]>({
        url: `/v1/accounts`,
        method: 'get',
        signal,
        params: {
          page: 1,
          pageSize: 15,
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
    <div className="flex flex-col gap-5">
      <div>ACCOUNTS</div>
      <QueryCacheExample />
      <div>
        <button
          onClick={() => {
            queryClient.invalidateQueries({
              queryKey: ['accounts_pure'],
            });

            // ignores the cache and fetches new data
            refetch();
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
      </div>
      <div>
        pure tanstack:
        <JsonToTable json={accountsPure} />
      </div>
    </div>
  );
}
