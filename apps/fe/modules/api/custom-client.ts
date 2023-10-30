import Axios, { AxiosError, AxiosHeaders, AxiosRequestConfig } from 'axios';
// import { getAuth, getIdToken, signOut } from 'firebase/auth';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
}); // use your own URL here or environment variable

// add a second `options` argument here if you want to pass extra options to each generated query
export const customClient = async <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  // const auth = getAuth();
  // const user = auth.currentUser;
  // let token: undefined | string = undefined;

  const headers = new AxiosHeaders();

  // if (user) {
  //   token = await getIdToken(user);
  //   headers.set('Authorization', `Bearer ${token}`);
  // }

  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
    headers: {
      ...config.headers,
      ...headers,
    },
  }).then(({ data }) => data);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

AXIOS_INSTANCE.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response?.status === 401) {
    //   const auth = getAuth();
    //   signOut(auth);
    // }
    return Promise.reject(error);
  }
);

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
