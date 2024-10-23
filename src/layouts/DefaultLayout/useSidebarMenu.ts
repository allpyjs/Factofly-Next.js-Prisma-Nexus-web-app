import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import useWindowDimensions from '~/features/shared/hooks/useWindowDimensions';

const MOBILE_BREAKPOINT = 1200;

export default function useSidebarMenu() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarMiniMode, setSidebarMiniMode] = useState(false);
  const { width } = useWindowDimensions();

  const toggleMenu = useCallback(() => {
    if (width < MOBILE_BREAKPOINT) {
      setSidebarOpen(!isSidebarOpen);
    } else {
      setSidebarMiniMode(!sidebarMiniMode);
    }
  }, [width, isSidebarOpen, sidebarMiniMode, setSidebarMiniMode, setSidebarOpen]);

  const closeMenu = useCallback(() => {
    if (width < MOBILE_BREAKPOINT) {
      setSidebarOpen(false);
    }
  }, [width]);

  const closeOnKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (width < MOBILE_BREAKPOINT) {
      setSidebarMiniMode(false);
      setSidebarOpen(false);
    } else {
      setSidebarMiniMode(false);
      setSidebarOpen(true);
    }
  }, [width]);

  // close the menu when the route changes.
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      closeMenu();
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events, closeMenu]);

  return {
    closeMenu,
    toggleMenu,
    closeOnKeyPress,
    isSidebarOpen,
    sidebarMiniMode
  };
}
