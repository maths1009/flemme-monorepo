import { useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';

const GA_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;
const IS_PROD = import.meta.env.PROD;

if (typeof window !== 'undefined' && IS_PROD && GA_ID) {
  ReactGA.initialize(GA_ID);
}

function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!IS_PROD || !GA_ID) return;

    const fullPath = location.pathname + location.search;

    ReactGA.send({
      hitType: 'pageview',
      page: fullPath,
      title: document.title,
    });
  }, [location.pathname, location.search]);

  return null;
}

export { GoogleAnalytics };
