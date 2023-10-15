import { useEffect, useState } from "react";

export const useDebounced = (searchQuery: string, delay: number) => {
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  useEffect(() => {
    const handleDebouncedSearch = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, delay);
    return () => {
      clearTimeout(handleDebouncedSearch);
    };
  }, [searchQuery, delay]);

  return debouncedSearchQuery;
};
