import {
  AccountDto,
  AccountsControllerFindAllParams,
  useAccountsControllerFindAll,
} from '@fe/modules/api';
import { customClient } from '@fe/modules/api/custom-client';
import { queryClient } from '@fe/modules/providers/ClientProviders';
import { useQuery } from '@tanstack/react-query';

export const QueryCacheExample = () => {
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

  const { data: accountsPure } = useQuery({
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

  const dataFromQueryClient = queryClient.getQueryCache().find({
    queryKey: ['accounts'],
  })?.state.data;

  console.groupCollapsed('QueryCacheExample');

  console.log('orval generated:', accounts);

  console.log('pure tanstack:', accountsPure);

  console.log('query client:', dataFromQueryClient);

  console.groupEnd();

  return <div>QueryCacheExample</div>;
};
