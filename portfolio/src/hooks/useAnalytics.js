import { useEffect, useCallback } from 'react';
import { API_BASE } from '../config/api';

export function usePageTracker() {
  useEffect(() => {
    fetch(`${API_BASE}/api/analytics/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page: window.location.pathname, section: 'home' }),
    }).catch(() => {});
  }, []);
}

export function useSectionTracker(sectionName, inView) {
  useEffect(() => {
    if (inView) {
      fetch(`${API_BASE}/api/analytics/track`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: window.location.pathname, section: sectionName }),
      }).catch(() => {});
    }
  }, [inView, sectionName]);
}
