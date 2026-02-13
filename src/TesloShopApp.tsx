import { RouterProvider } from 'react-router';
import { appRouter } from './app.router';
import { QueryClientProvider, QueryClient, useQuery } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import type { PropsWithChildren } from 'react';
import { CustomFullScreenLoading } from './components/custom/CustomFullScreenLoading';
import { useAuthStore } from './auth/store/auth.store';

const queryClient = new QueryClient();

const CheckAuthProvider = ({ children }: PropsWithChildren) => {

    const { chechAuthStatus } = useAuthStore();
    
    const { isLoading } = useQuery({
        queryKey: ['auth'],
        queryFn: chechAuthStatus,
        retry: false,
        refetchInterval: 1000 * 60 * 1.5, // 1:30 hora
        refetchOnWindowFocus: true
    });

    if ( isLoading ) return <CustomFullScreenLoading />;

    return children;
}

export const TesloShopApp = () => {
    
    return (
        <QueryClientProvider client={queryClient}>
            <Toaster />

            <CheckAuthProvider>
                <RouterProvider router={appRouter} />
            </CheckAuthProvider>

            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
