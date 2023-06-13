import { useRouter } from 'react/router';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics';

export function useVercelAnalytics() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      Analytics.trackPageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
}