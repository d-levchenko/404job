'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState, type ReactNode } from 'react';

type TanStackProviderProps = {
  children: ReactNode;
};

const TanStackProvider = ({ children }: TanStackProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanStackProvider;
