import { AccountDto, useAccountsControllerCreate } from '@fe/modules/api';
import { customClient } from '@fe/modules/api/custom-client';
import { useFilterQuery } from '@fe/modules/hooks/useFilterQuery';
import { queryClient } from '@fe/modules/providers/ClientProviders';
import { useMutation } from '@tanstack/react-query';
import { useReducer } from 'react';

interface IAddNewAccountFormState {
  email: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

const initialState: IAddNewAccountFormState = {
  email: '',
  firstName: '',
  lastName: '',
  avatarUrl: '',
};

const init = (initialState: IAddNewAccountFormState) => {
  return initialState;
};

type AddNewAccountFormAction =
  | { type: 'email'; payload: string }
  | { type: 'firstName'; payload: string }
  | { type: 'lastName'; payload: string }
  | { type: 'avatarUrl'; payload: string };

const reducer = (
  state: IAddNewAccountFormState,
  action: AddNewAccountFormAction
) => {
  switch (action.type) {
    case 'email':
      return { ...state, email: action.payload };
    case 'firstName':
      return { ...state, firstName: action.payload };
    case 'lastName':
      return { ...state, lastName: action.payload };
    case 'avatarUrl':
      return { ...state, avatarUrl: action.payload };
    default:
      return state;
  }
};

export const AddNewAccountForm = () => {
  const { params } = useFilterQuery();

  const [state, dispatch] = useReducer(reducer, initialState, init);

  const { mutate, mutateAsync, data, error } = useAccountsControllerCreate();

  const {
    mutate: pureMutation,
    mutateAsync: pureMutationAsync,
    data: pureData,
    error: pureError,
  } = useMutation({
    mutationKey: ['accounts_pure', state],
    mutationFn: () => {
      return customClient<AccountDto>({
        url: `/v1/accounts`,
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: state,
        paramsSerializer: (params) => {
          return Object.entries(params)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        },
      });
    },
  });

  const page = Number(params.get('page') ?? 1);
  const pageSize = Number(params.get('pageSize') ?? 10);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();

        mutate(
          {
            data: state,
          },
          {
            onSuccess: (data) => {
              console.log('SUCCESS', data);

              queryClient.refetchQueries({
                queryKey: ['accounts', page, pageSize],
              });
            },
            onError: (error) => {
              console.log('ERROR', error);
            },
          }
        );
      }}
    >
      Add new Account form
      <input
        type="text"
        className="border border-gray-500 rounded-lg py-4 px-6"
        placeholder="email"
        onChange={(e) => {
          dispatch({ type: 'email', payload: e.target.value });
        }}
      />
      <input
        type="text"
        className="border border-gray-500 rounded-lg py-4 px-6"
        placeholder="firstName"
        onChange={(e) => {
          dispatch({ type: 'firstName', payload: e.target.value });
        }}
      />
      <input
        type="text"
        className="border border-gray-500 rounded-lg py-4 px-6"
        placeholder="lastName"
        onChange={(e) => {
          dispatch({ type: 'lastName', payload: e.target.value });
        }}
      />
      <input
        type="text"
        className="border border-gray-500 rounded-lg py-4 px-6"
        placeholder="avatarUrl"
        onChange={(e) => {
          dispatch({ type: 'avatarUrl', payload: e.target.value });
        }}
      />
      <button
        type="submit"
        className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Create
      </button>
      {data && <div>data: {JSON.stringify(data)}</div>}
      {error && (
        <div className="text-primary-red">error: {JSON.stringify(error)}</div>
      )}
    </form>
  );
};
