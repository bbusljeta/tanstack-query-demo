'use client';

import { QueryCacheExample } from '@fe/app/(_components)/QueryCacheExample';
import { useAccountsControllerFindAll } from '@fe/modules/api';

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

  return (
    <>
      <div>ACCOUNTS</div>
      <QueryCacheExample />
    </>
  );
}
