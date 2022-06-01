import {
  useInfiniteQuery as _useInfiniteQuery,
  useQuery as _useQuery,
} from 'vue-query';
import type { UnwrapRef } from 'vue';
import type { UseQueryReturnType, UseQueryOptions } from 'vue-query';
import type {
  QueryKey,
  QueryFunction,
  QueryFunctionContext,
  UseInfiniteQueryOptions,
  InfiniteQueryObserverResult,
} from 'react-query';

type UseInfiniteQueryReturnType<TData, TError> = UseQueryReturnType<
  TData,
  TError,
  InfiniteQueryObserverResult<TData, TError>
>;

export async function useQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  key: TQueryKey,
  handler: QueryFunction<TQueryFnData, UnwrapRef<TQueryKey>>,
  options?: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
) {
  const { suspense, ...query } = _useQuery(
    key,
    (context) =>
      queryBase<TQueryFnData, TQueryKey, UseQueryReturnType<TData, TError>>(
        key,
        handler,
        context
      ),
    options
  );

  await suspense();

  return query;
}

export async function useInfiniteQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  key: TQueryKey,
  handler: QueryFunction<TQueryFnData, UnwrapRef<TQueryKey>>,
  options?: Omit<
    UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
) {
  const { suspense, ...query } = _useInfiniteQuery(
    key,
    (context) =>
      queryBase<
        TQueryFnData,
        TQueryKey,
        UseInfiniteQueryReturnType<TData, TError>
      >(key, handler, context),
    options as any
  );

  await suspense();

  return query;
}

async function queryBase<
  TQueryFnData = unknown,
  TQueryKey extends QueryKey = QueryKey,
  TReturnType = any
>(
  key: TQueryKey,
  handler: QueryFunction<TQueryFnData, UnwrapRef<TQueryKey>>,
  context: QueryFunctionContext<UnwrapRef<TQueryKey>>
) {
  const { parse, stringify } = JSON;
  const nuxt = useNuxtApp();
  const _key = stringify(key);

  if (nuxt.payload.data?.[_key]) {
    const data = parse(nuxt.payload.data[_key]);
    delete nuxt.payload.data[_key];
    return data;
  }

  const data = await handler(context);

  if (process.server && nuxt.payload.data) {
    nuxt.payload.data[_key] = stringify(data);
  }

  return data as unknown as TReturnType;
}
