import {
  AccountDto,
  AccountsControllerFindAllParams,
  useAccountsControllerFindAll,
} from '@fe/modules/api';
import { customClient } from '@fe/modules/api/custom-client';
import { useFilterQuery } from '@fe/modules/hooks/useFilterQuery';
import { queryClient } from '@fe/modules/providers/ClientProviders';
import { useQuery } from '@tanstack/react-query';

export const QueryCacheExample = () => {
  const { params } = useFilterQuery();

  const page = Number(params.get('page') ?? 1);
  const pageSize = Number(params.get('pageSize') ?? 10);

  const { data: accounts } = useAccountsControllerFindAll(
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

  const dataFromQueryClient = queryClient.getQueryCache().find({
    queryKey: ['accounts', page, pageSize],
  })?.state.data;

  console.groupCollapsed('QueryCacheExample');

  console.log('orval generated:', accounts);

  console.log('pure tanstack:', accountsPure);

  console.log('query client cache:', dataFromQueryClient);

  console.groupEnd();

  return <div>QueryCacheExample</div>;
};
