import { createStandaloneToast } from '@chakra-ui/react';
import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

import { theme } from '../theme';

const toast = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const title =
    error instanceof Error ? error.message : 'error connecting to server';

  // prevent duplicate toasts
  toast.closeAll();
  toast({ title, status: 'error', variant: 'subtle', isClosable: true });
}

export function defaultQueryClient(logger?: {
  log: () => void;
  warn: () => void;
  error: () => void;
}): QueryClient {
  const queryClientOption: QueryClientConfig = {
    defaultOptions: {
      queries: {
        onError: queryErrorHandler,
        staleTime: 1000 * 60 * 10, // 10 Min
        cacheTime: 1000 * 60 * 15, // 15 Min
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
      mutations: {
        onError: queryErrorHandler,
      },
    },
  };
  if (logger) queryClientOption.logger = logger;

  return new QueryClient(queryClientOption);
}

// to satisfy typescript until this file has uncommented contents
export const queryClient = defaultQueryClient();
