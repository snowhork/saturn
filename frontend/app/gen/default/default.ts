/**
 * Generated by orval v7.1.0 🍺
 * Do not edit manually.
 * Query API
 * OpenAPI spec version: 0.1.0
 */
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import axios from "axios";
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import type {
  HTTPValidationError,
  HealthApiHealthGet200,
  Item,
  ListItemsApiItemsGetParams,
  OAuthToken,
  RefreshApiOauthNameGoogleDriveRefreshPostParams,
  RootDirApiRootGetParams,
  Storage,
  TokenApiOauthNameGoogleDriveTokenPostParams,
  TransferRequest,
} from ".././schema";

/**
 * ヘルスチェック
 * @summary Health
 */
export const healthApiHealthGet = (
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<HealthApiHealthGet200>> => {
  return axios.get(`/api/health`, options);
};

export const getHealthApiHealthGetQueryKey = () => {
  return [`/api/health`] as const;
};

export const getHealthApiHealthGetQueryOptions = <
  TData = Awaited<ReturnType<typeof healthApiHealthGet>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof healthApiHealthGet>>,
      TError,
      TData
    >
  >;
  axios?: AxiosRequestConfig;
}) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getHealthApiHealthGetQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof healthApiHealthGet>>
  > = ({ signal }) => healthApiHealthGet({ signal, ...axiosOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof healthApiHealthGet>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type HealthApiHealthGetQueryResult = NonNullable<
  Awaited<ReturnType<typeof healthApiHealthGet>>
>;
export type HealthApiHealthGetQueryError = AxiosError<unknown>;

export function useHealthApiHealthGet<
  TData = Awaited<ReturnType<typeof healthApiHealthGet>>,
  TError = AxiosError<unknown>,
>(options: {
  query: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof healthApiHealthGet>>,
      TError,
      TData
    >
  > &
    Pick<
      DefinedInitialDataOptions<
        Awaited<ReturnType<typeof healthApiHealthGet>>,
        TError,
        TData
      >,
      "initialData"
    >;
  axios?: AxiosRequestConfig;
}): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useHealthApiHealthGet<
  TData = Awaited<ReturnType<typeof healthApiHealthGet>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof healthApiHealthGet>>,
      TError,
      TData
    >
  > &
    Pick<
      UndefinedInitialDataOptions<
        Awaited<ReturnType<typeof healthApiHealthGet>>,
        TError,
        TData
      >,
      "initialData"
    >;
  axios?: AxiosRequestConfig;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useHealthApiHealthGet<
  TData = Awaited<ReturnType<typeof healthApiHealthGet>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof healthApiHealthGet>>,
      TError,
      TData
    >
  >;
  axios?: AxiosRequestConfig;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey };
/**
 * @summary Health
 */

export function useHealthApiHealthGet<
  TData = Awaited<ReturnType<typeof healthApiHealthGet>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof healthApiHealthGet>>,
      TError,
      TData
    >
  >;
  axios?: AxiosRequestConfig;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getHealthApiHealthGetQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary  List
 */
export const listApiStoragesGet = (
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<Storage[]>> => {
  return axios.get(`/api/storages`, options);
};

export const getListApiStoragesGetQueryKey = () => {
  return [`/api/storages`] as const;
};

export const getListApiStoragesGetQueryOptions = <
  TData = Awaited<ReturnType<typeof listApiStoragesGet>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof listApiStoragesGet>>,
      TError,
      TData
    >
  >;
  axios?: AxiosRequestConfig;
}) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getListApiStoragesGetQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listApiStoragesGet>>
  > = ({ signal }) => listApiStoragesGet({ signal, ...axiosOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listApiStoragesGet>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ListApiStoragesGetQueryResult = NonNullable<
  Awaited<ReturnType<typeof listApiStoragesGet>>
>;
export type ListApiStoragesGetQueryError = AxiosError<unknown>;

export function useListApiStoragesGet<
  TData = Awaited<ReturnType<typeof listApiStoragesGet>>,
  TError = AxiosError<unknown>,
>(options: {
  query: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof listApiStoragesGet>>,
      TError,
      TData
    >
  > &
    Pick<
      DefinedInitialDataOptions<
        Awaited<ReturnType<typeof listApiStoragesGet>>,
        TError,
        TData
      >,
      "initialData"
    >;
  axios?: AxiosRequestConfig;
}): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useListApiStoragesGet<
  TData = Awaited<ReturnType<typeof listApiStoragesGet>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof listApiStoragesGet>>,
      TError,
      TData
    >
  > &
    Pick<
      UndefinedInitialDataOptions<
        Awaited<ReturnType<typeof listApiStoragesGet>>,
        TError,
        TData
      >,
      "initialData"
    >;
  axios?: AxiosRequestConfig;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useListApiStoragesGet<
  TData = Awaited<ReturnType<typeof listApiStoragesGet>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof listApiStoragesGet>>,
      TError,
      TData
    >
  >;
  axios?: AxiosRequestConfig;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey };
/**
 * @summary  List
 */

export function useListApiStoragesGet<
  TData = Awaited<ReturnType<typeof listApiStoragesGet>>,
  TError = AxiosError<unknown>,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof listApiStoragesGet>>,
      TError,
      TData
    >
  >;
  axios?: AxiosRequestConfig;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getListApiStoragesGetQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary  Root Dir
 */
export const rootDirApiRootGet = (
  params: RootDirApiRootGetParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<Item>> => {
  return axios.get(`/api/root`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getRootDirApiRootGetQueryKey = (
  params: RootDirApiRootGetParams,
) => {
  return [`/api/root`, ...(params ? [params] : [])] as const;
};

export const getRootDirApiRootGetQueryOptions = <
  TData = Awaited<ReturnType<typeof rootDirApiRootGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  params: RootDirApiRootGetParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof rootDirApiRootGet>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  },
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getRootDirApiRootGetQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof rootDirApiRootGet>>
  > = ({ signal }) => rootDirApiRootGet(params, { signal, ...axiosOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof rootDirApiRootGet>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type RootDirApiRootGetQueryResult = NonNullable<
  Awaited<ReturnType<typeof rootDirApiRootGet>>
>;
export type RootDirApiRootGetQueryError = AxiosError<HTTPValidationError>;

export function useRootDirApiRootGet<
  TData = Awaited<ReturnType<typeof rootDirApiRootGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  params: RootDirApiRootGetParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof rootDirApiRootGet>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof rootDirApiRootGet>>,
          TError,
          TData
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useRootDirApiRootGet<
  TData = Awaited<ReturnType<typeof rootDirApiRootGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  params: RootDirApiRootGetParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof rootDirApiRootGet>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof rootDirApiRootGet>>,
          TError,
          TData
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useRootDirApiRootGet<
  TData = Awaited<ReturnType<typeof rootDirApiRootGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  params: RootDirApiRootGetParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof rootDirApiRootGet>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
/**
 * @summary  Root Dir
 */

export function useRootDirApiRootGet<
  TData = Awaited<ReturnType<typeof rootDirApiRootGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  params: RootDirApiRootGetParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof rootDirApiRootGet>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getRootDirApiRootGetQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary  List Items
 */
export const listItemsApiItemsGet = (
  params: ListItemsApiItemsGetParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<Item[]>> => {
  return axios.get(`/api/items`, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getListItemsApiItemsGetQueryKey = (
  params: ListItemsApiItemsGetParams,
) => {
  return [`/api/items`, ...(params ? [params] : [])] as const;
};

export const getListItemsApiItemsGetQueryOptions = <
  TData = Awaited<ReturnType<typeof listItemsApiItemsGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  params: ListItemsApiItemsGetParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listItemsApiItemsGet>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  },
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getListItemsApiItemsGetQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof listItemsApiItemsGet>>
  > = ({ signal }) => listItemsApiItemsGet(params, { signal, ...axiosOptions });

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof listItemsApiItemsGet>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ListItemsApiItemsGetQueryResult = NonNullable<
  Awaited<ReturnType<typeof listItemsApiItemsGet>>
>;
export type ListItemsApiItemsGetQueryError = AxiosError<HTTPValidationError>;

export function useListItemsApiItemsGet<
  TData = Awaited<ReturnType<typeof listItemsApiItemsGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  params: ListItemsApiItemsGetParams,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listItemsApiItemsGet>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof listItemsApiItemsGet>>,
          TError,
          TData
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useListItemsApiItemsGet<
  TData = Awaited<ReturnType<typeof listItemsApiItemsGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  params: ListItemsApiItemsGetParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listItemsApiItemsGet>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof listItemsApiItemsGet>>,
          TError,
          TData
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useListItemsApiItemsGet<
  TData = Awaited<ReturnType<typeof listItemsApiItemsGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  params: ListItemsApiItemsGetParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listItemsApiItemsGet>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
/**
 * @summary  List Items
 */

export function useListItemsApiItemsGet<
  TData = Awaited<ReturnType<typeof listItemsApiItemsGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  params: ListItemsApiItemsGetParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof listItemsApiItemsGet>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getListItemsApiItemsGetQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary  Transfer
 */
export const transferApiTransferPost = (
  transferRequest: TransferRequest,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<string>> => {
  return axios.post(`/api/transfer`, transferRequest, options);
};

export const getTransferApiTransferPostMutationOptions = <
  TError = AxiosError<HTTPValidationError>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof transferApiTransferPost>>,
    TError,
    { data: TransferRequest },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof transferApiTransferPost>>,
  TError,
  { data: TransferRequest },
  TContext
> => {
  const { mutation: mutationOptions, axios: axiosOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof transferApiTransferPost>>,
    { data: TransferRequest }
  > = (props) => {
    const { data } = props ?? {};

    return transferApiTransferPost(data, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type TransferApiTransferPostMutationResult = NonNullable<
  Awaited<ReturnType<typeof transferApiTransferPost>>
>;
export type TransferApiTransferPostMutationBody = TransferRequest;
export type TransferApiTransferPostMutationError =
  AxiosError<HTTPValidationError>;

/**
 * @summary  Transfer
 */
export const useTransferApiTransferPost = <
  TError = AxiosError<HTTPValidationError>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof transferApiTransferPost>>,
    TError,
    { data: TransferRequest },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationResult<
  Awaited<ReturnType<typeof transferApiTransferPost>>,
  TError,
  { data: TransferRequest },
  TContext
> => {
  const mutationOptions = getTransferApiTransferPostMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Auth
 */
export const authApiOauthNameGoogleDriveAuthGet = (
  name: string,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<string>> => {
  return axios.get(`/api/oauth/${name}/google_drive/auth`, options);
};

export const getAuthApiOauthNameGoogleDriveAuthGetQueryKey = (name: string) => {
  return [`/api/oauth/${name}/google_drive/auth`] as const;
};

export const getAuthApiOauthNameGoogleDriveAuthGetQueryOptions = <
  TData = Awaited<ReturnType<typeof authApiOauthNameGoogleDriveAuthGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  name: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof authApiOauthNameGoogleDriveAuthGet>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  },
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getAuthApiOauthNameGoogleDriveAuthGetQueryKey(name);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof authApiOauthNameGoogleDriveAuthGet>>
  > = ({ signal }) =>
    authApiOauthNameGoogleDriveAuthGet(name, { signal, ...axiosOptions });

  return {
    queryKey,
    queryFn,
    enabled: !!name,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof authApiOauthNameGoogleDriveAuthGet>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type AuthApiOauthNameGoogleDriveAuthGetQueryResult = NonNullable<
  Awaited<ReturnType<typeof authApiOauthNameGoogleDriveAuthGet>>
>;
export type AuthApiOauthNameGoogleDriveAuthGetQueryError =
  AxiosError<HTTPValidationError>;

export function useAuthApiOauthNameGoogleDriveAuthGet<
  TData = Awaited<ReturnType<typeof authApiOauthNameGoogleDriveAuthGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  name: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof authApiOauthNameGoogleDriveAuthGet>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof authApiOauthNameGoogleDriveAuthGet>>,
          TError,
          TData
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useAuthApiOauthNameGoogleDriveAuthGet<
  TData = Awaited<ReturnType<typeof authApiOauthNameGoogleDriveAuthGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  name: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof authApiOauthNameGoogleDriveAuthGet>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof authApiOauthNameGoogleDriveAuthGet>>,
          TError,
          TData
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useAuthApiOauthNameGoogleDriveAuthGet<
  TData = Awaited<ReturnType<typeof authApiOauthNameGoogleDriveAuthGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  name: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof authApiOauthNameGoogleDriveAuthGet>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
/**
 * @summary Auth
 */

export function useAuthApiOauthNameGoogleDriveAuthGet<
  TData = Awaited<ReturnType<typeof authApiOauthNameGoogleDriveAuthGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  name: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof authApiOauthNameGoogleDriveAuthGet>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getAuthApiOauthNameGoogleDriveAuthGetQueryOptions(
    name,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}

/**
 * @summary Token
 */
export const tokenApiOauthNameGoogleDriveTokenPost = (
  name: string,
  params: TokenApiOauthNameGoogleDriveTokenPostParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<OAuthToken>> => {
  return axios.post(`/api/oauth/${name}/google_drive/token`, undefined, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getTokenApiOauthNameGoogleDriveTokenPostMutationOptions = <
  TError = AxiosError<HTTPValidationError>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof tokenApiOauthNameGoogleDriveTokenPost>>,
    TError,
    { name: string; params: TokenApiOauthNameGoogleDriveTokenPostParams },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof tokenApiOauthNameGoogleDriveTokenPost>>,
  TError,
  { name: string; params: TokenApiOauthNameGoogleDriveTokenPostParams },
  TContext
> => {
  const { mutation: mutationOptions, axios: axiosOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof tokenApiOauthNameGoogleDriveTokenPost>>,
    { name: string; params: TokenApiOauthNameGoogleDriveTokenPostParams }
  > = (props) => {
    const { name, params } = props ?? {};

    return tokenApiOauthNameGoogleDriveTokenPost(name, params, axiosOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type TokenApiOauthNameGoogleDriveTokenPostMutationResult = NonNullable<
  Awaited<ReturnType<typeof tokenApiOauthNameGoogleDriveTokenPost>>
>;

export type TokenApiOauthNameGoogleDriveTokenPostMutationError =
  AxiosError<HTTPValidationError>;

/**
 * @summary Token
 */
export const useTokenApiOauthNameGoogleDriveTokenPost = <
  TError = AxiosError<HTTPValidationError>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof tokenApiOauthNameGoogleDriveTokenPost>>,
    TError,
    { name: string; params: TokenApiOauthNameGoogleDriveTokenPostParams },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationResult<
  Awaited<ReturnType<typeof tokenApiOauthNameGoogleDriveTokenPost>>,
  TError,
  { name: string; params: TokenApiOauthNameGoogleDriveTokenPostParams },
  TContext
> => {
  const mutationOptions =
    getTokenApiOauthNameGoogleDriveTokenPostMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Refresh
 */
export const refreshApiOauthNameGoogleDriveRefreshPost = (
  name: string,
  params: RefreshApiOauthNameGoogleDriveRefreshPostParams,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<OAuthToken>> => {
  return axios.post(`/api/oauth/${name}/google_drive/refresh`, undefined, {
    ...options,
    params: { ...params, ...options?.params },
  });
};

export const getRefreshApiOauthNameGoogleDriveRefreshPostMutationOptions = <
  TError = AxiosError<HTTPValidationError>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof refreshApiOauthNameGoogleDriveRefreshPost>>,
    TError,
    { name: string; params: RefreshApiOauthNameGoogleDriveRefreshPostParams },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationOptions<
  Awaited<ReturnType<typeof refreshApiOauthNameGoogleDriveRefreshPost>>,
  TError,
  { name: string; params: RefreshApiOauthNameGoogleDriveRefreshPostParams },
  TContext
> => {
  const { mutation: mutationOptions, axios: axiosOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof refreshApiOauthNameGoogleDriveRefreshPost>>,
    { name: string; params: RefreshApiOauthNameGoogleDriveRefreshPostParams }
  > = (props) => {
    const { name, params } = props ?? {};

    return refreshApiOauthNameGoogleDriveRefreshPost(
      name,
      params,
      axiosOptions,
    );
  };

  return { mutationFn, ...mutationOptions };
};

export type RefreshApiOauthNameGoogleDriveRefreshPostMutationResult =
  NonNullable<
    Awaited<ReturnType<typeof refreshApiOauthNameGoogleDriveRefreshPost>>
  >;

export type RefreshApiOauthNameGoogleDriveRefreshPostMutationError =
  AxiosError<HTTPValidationError>;

/**
 * @summary Refresh
 */
export const useRefreshApiOauthNameGoogleDriveRefreshPost = <
  TError = AxiosError<HTTPValidationError>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof refreshApiOauthNameGoogleDriveRefreshPost>>,
    TError,
    { name: string; params: RefreshApiOauthNameGoogleDriveRefreshPostParams },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationResult<
  Awaited<ReturnType<typeof refreshApiOauthNameGoogleDriveRefreshPost>>,
  TError,
  { name: string; params: RefreshApiOauthNameGoogleDriveRefreshPostParams },
  TContext
> => {
  const mutationOptions =
    getRefreshApiOauthNameGoogleDriveRefreshPostMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Catch All
 */
export const catchAllPathNameGet = (
  pathName: string,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<unknown>> => {
  return axios.get(`/${pathName}`, options);
};

export const getCatchAllPathNameGetQueryKey = (pathName: string) => {
  return [`/${pathName}`] as const;
};

export const getCatchAllPathNameGetQueryOptions = <
  TData = Awaited<ReturnType<typeof catchAllPathNameGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  pathName: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof catchAllPathNameGet>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  },
) => {
  const { query: queryOptions, axios: axiosOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getCatchAllPathNameGetQueryKey(pathName);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof catchAllPathNameGet>>
  > = ({ signal }) =>
    catchAllPathNameGet(pathName, { signal, ...axiosOptions });

  return {
    queryKey,
    queryFn,
    enabled: !!pathName,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof catchAllPathNameGet>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type CatchAllPathNameGetQueryResult = NonNullable<
  Awaited<ReturnType<typeof catchAllPathNameGet>>
>;
export type CatchAllPathNameGetQueryError = AxiosError<HTTPValidationError>;

export function useCatchAllPathNameGet<
  TData = Awaited<ReturnType<typeof catchAllPathNameGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  pathName: string,
  options: {
    query: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof catchAllPathNameGet>>,
        TError,
        TData
      >
    > &
      Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof catchAllPathNameGet>>,
          TError,
          TData
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
): DefinedUseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useCatchAllPathNameGet<
  TData = Awaited<ReturnType<typeof catchAllPathNameGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  pathName: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof catchAllPathNameGet>>,
        TError,
        TData
      >
    > &
      Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof catchAllPathNameGet>>,
          TError,
          TData
        >,
        "initialData"
      >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
export function useCatchAllPathNameGet<
  TData = Awaited<ReturnType<typeof catchAllPathNameGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  pathName: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof catchAllPathNameGet>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey };
/**
 * @summary Catch All
 */

export function useCatchAllPathNameGet<
  TData = Awaited<ReturnType<typeof catchAllPathNameGet>>,
  TError = AxiosError<HTTPValidationError>,
>(
  pathName: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof catchAllPathNameGet>>,
        TError,
        TData
      >
    >;
    axios?: AxiosRequestConfig;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } {
  const queryOptions = getCatchAllPathNameGetQueryOptions(pathName, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
}
