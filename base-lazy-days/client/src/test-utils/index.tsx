// eslint-disable-next-line no-console
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, RenderResult } from '@testing-library/react';
import { ReactElement } from 'react';

import { defaultQueryClient } from '../react-query/queryClient';

const generateTestQueryClient = () => {
  const client = defaultQueryClient({
    log: console.log,
    warn: console.warn,
    error: () => {
      // no log
    },
  });

  const options = client.getDefaultOptions();
  options.queries = {
    ...options.queries,
    retry: false,
  };

  return client;
};

export function renderWithQueryClient(
  ui: ReactElement,
  client?: QueryClient,
): RenderResult {
  const queryClient = client ?? generateTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

// import { defaultQueryClientOptions } from '../react-query/queryClient';

// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
export const createQueryClientWrapper = (): React.FC => {
  const queryClient = generateTestQueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
