import { useAccountsControllerFindAll } from '@fe/modules/api';
import { queryClient } from '@fe/modules/providers/ClientProviders';

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

  const dataFromQueryClient = queryClient.getQueryCache().find({
    queryKey: ['accounts'],
  })?.state.data;

  console.log(accounts, dataFromQueryClient);

  return <div>QueryCacheExample</div>;
};
