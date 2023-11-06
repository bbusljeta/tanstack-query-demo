import {
  useSearchParams as useNextSearchParams,
  usePathname,
  useRouter,
} from 'next/navigation';
import { useCallback, useMemo } from 'react';

const filterSearchParams = (
  params: URLSearchParams,
  filter: string,
  value: string | number,
) => {
  const currentFilterParams = params.getAll(filter);
  let temp = currentFilterParams;
  temp = temp.filter((tempValue) => tempValue !== value.toString());
  params.delete(filter);
  if (temp.length) {
    temp.forEach((tempValue) => {
      params.append(filter, tempValue);
    });
  }
};

export const handleQueryFilterChange = (
  params: URLSearchParams,
  filter: string,
  value: string | number,
  checked: boolean,
) => {
  if (checked) {
    filterSearchParams(params, filter, value);
  } else {
    params.append(filter, value.toString());
  }
};

export const useSearchParams = () => {
  const searchParams = useNextSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );

  return {
    params,
  };
};

export const useFilterQuery = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const routing = useCallback(() => {
    const searchParamsString = '?' + params.params.toString();
    if (location.search === searchParamsString) return;
    router.push(pathname + searchParamsString);
  }, [router, pathname, params.params]);

  const handleFilterChange = useCallback(
    (filter: string, value: string | number) => {
      if (params.params.getAll(filter).includes(value.toString())) {
        handleQueryFilterChange(params.params, filter, value, true);
      } else {
        handleQueryFilterChange(params.params, filter, value, false);
      }
      routing();
    },
    [routing, params.params],
  );

  return {
    handleFilterChange,
    params: params.params,
    reroute: routing,
  };
};
