import { createContext } from '@radix-ui/react-context';
import { useLocation } from '@tanstack/react-router';
import { type ReactNode, useEffect, useState } from 'react';
import ReactGA from 'react-ga4';

const GA_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
const IS_PROD = import.meta.env.PROD;
const STORAGE_KEY = 'cookie_consent';

interface AnalyticsContextType {
  consent: boolean | null;
  isLoading: boolean;
  grantConsent: () => void;
  denyConsent: () => void;
}

const [AnalyticsProviderContext, useAnalyticsContext] = createContext<AnalyticsContextType>('Analytics');

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(STORAGE_KEY);
      if (item !== null) {
        setConsentState(item === 'true');
      }
      setIsLoading(false);
    }
  }, []);

  const grantConsent = () => {
    setConsentState(true);
    localStorage.setItem(STORAGE_KEY, 'true');
  };

  const denyConsent = () => {
    setConsentState(false);
    localStorage.setItem(STORAGE_KEY, 'false');
  };

  useEffect(() => {
    if (consent === true && IS_PROD && GA_ID) {
      if (!ReactGA.isInitialized) ReactGA.initialize(GA_ID);

      const path = location.pathname + location.search;
      const title = document.title;

      ReactGA.send({
        hitType: 'pageview',
        page: path,
        title: title,
      });
    }
  }, [consent, location.pathname, location.search]);

  return (
    <AnalyticsProviderContext
      consent={consent}
      denyConsent={denyConsent}
      grantConsent={grantConsent}
      isLoading={isLoading}
    >
      {children}
    </AnalyticsProviderContext>
  );
}

export function useAnalytics() {
  return useAnalyticsContext('Analytics');
}
