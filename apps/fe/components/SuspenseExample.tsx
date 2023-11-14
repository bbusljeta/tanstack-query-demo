import {
  AccountDto,
  AccountsControllerFindAllParams,
  useAccountsControllerFindAllSuspense,
} from '@fe/modules/api';
import { customClient } from '@fe/modules/api/custom-client';
import { useFilterQuery } from '@fe/modules/hooks/useFilterQuery';
import { queryClient } from '@fe/modules/providers/ClientProviders';
import { useSuspenseQuery } from '@tanstack/react-query';

export const SuspenseExample = () => {
  const { params } = useFilterQuery();

  const page = Number(params.get('page') ?? 1);
  const pageSize = Number(params.get('pageSize') ?? 10);

  const { data: accounts, refetch } = useAccountsControllerFindAllSuspense(
    {
      page,
      pageSize,
    },
    {
      query: {
        queryKey: ['accounts_suspense_query', page, pageSize],
      },
    }
  );

  const { data: accountsPure } = useSuspenseQuery({
    queryKey: ['accounts_pure_suspense_query', page, pageSize],
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
    <div>
      Suspense example
      <button
        onClick={() => {
          queryClient.invalidateQueries({
            queryKey: ['accounts_suspense_query', page, pageSize],
          });

          // ignores the cache and refetches data
          refetch();
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Refetch
      </button>
    </div>
  );
};
