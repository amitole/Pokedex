import { useRef, useCallback, useEffect } from 'react';

interface UseInfiniteScrollOptions {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  disabled?: boolean;
  threshold?: number;
  rootMargin?: string;
}


export const useInfiniteScroll = ({
  loading,
  hasMore,
  onLoadMore,
  disabled = false,
  threshold = 0.5,
  rootMargin = '0px',
}: UseInfiniteScrollOptions) => {
  const observer = useRef<IntersectionObserver | null>(null);
  
  // Cleanup function to disconnect observer
  const cleanupObserver = useCallback(() => {
    if (observer.current) {
      observer.current.disconnect();
    }
  }, []);
  
  useEffect(() => {
    return () => cleanupObserver();
  }, [cleanupObserver]);
  
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading || disabled) return;
      
      cleanupObserver();
      
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading && !disabled) {
            onLoadMore();
          }
        },
        { threshold, rootMargin }
      );
      
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore, onLoadMore, disabled, threshold, rootMargin, cleanupObserver]
  );
  
  return lastElementRef;
}; 