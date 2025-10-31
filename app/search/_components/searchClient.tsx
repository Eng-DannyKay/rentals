"use client";

import CarCard from "@/components/carCard";
import { Pagination } from "@/components/ui/pagination";
import { SEARCH_CONFIG } from "@/constants/constants";
import {
  selectCarListings,
  selectSearchError,
  selectSearchLoading,
  selectTotalCount,
} from "@/lib/features/search/searchSelector";
import { fetchCarListings } from "@/lib/features/search/searchThunk";
import type { AppDispatch } from "@/lib/store";
import type { CarSearchParams } from "@/types/search.interface";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import { FilterSidebar } from "./filterSiderbar";
import { SearchHeader } from "./searchHeader";
import NoData from "@/components/ui/no-data";
import { CarCardSkeleton } from "./carCardSkeleton";

const useOptimalPageSize = () => {
  const [pageSize, setPageSize] = useState<number>(() => {
    if (globalThis.window !== undefined) {
      return globalThis.window.innerWidth >= 1024 ? 12 : 8;
    }
    return 8;
  });

  useEffect(() => {
    const calculatePageSize = () => {
      const screenWidth = globalThis.window.innerWidth;
      const cardWidth = 341;
      const gap = 20;
      const padding = 48;
      
      let optimalPageSize;
      
      if (screenWidth >= 1024) {
        optimalPageSize = 12;
      } else if (screenWidth >= 768) {
        const sidebarWidth = 320;
        const availableWidth = screenWidth - sidebarWidth - padding;
        const cardsPerRow = Math.floor((availableWidth + gap) / (cardWidth + gap));
        const calculatedPageSize = Math.max(cardsPerRow * 2, 6);
        optimalPageSize = Math.min(calculatedPageSize, 8);
      } else {
        const availableWidth = screenWidth - padding;
        const cardsPerRow = Math.floor((availableWidth + gap) / (cardWidth + gap));
        const calculatedPageSize = Math.max(cardsPerRow * 2, 6);
        optimalPageSize = Math.min(calculatedPageSize, 8);
      }
      
      setPageSize(prevSize => {
        if (prevSize !== optimalPageSize) {
          return optimalPageSize;
        }
        return prevSize;
      });
    };

    calculatePageSize();
    globalThis.window.addEventListener('resize', calculatePageSize);
    
    return () => globalThis.window.removeEventListener('resize', calculatePageSize);
  }, []);

  return pageSize;
};

const initialSearchParams: CarSearchParams = {
  page: 1,
  pageSize: 12,
  query: "",
  status: undefined,
  category: undefined,
  region: undefined,
  city: undefined,
  make: undefined,
  model: undefined,
  year: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  vin: undefined,
  fuelType: undefined,
  transmissionType: undefined,
};

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const carListings = useSelector(selectCarListings);
  const loading = useSelector(selectSearchLoading);
  const error = useSelector(selectSearchError);
  const totalCount = useSelector(selectTotalCount);
  const optimalPageSize = useOptimalPageSize();

  const [searchParams, setSearchParams] =
    useState<CarSearchParams>(initialSearchParams);

  useEffect(() => {
    dispatch(fetchCarListings({ ...searchParams, page: searchParams.page }));
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (searchParams.pageSize !== optimalPageSize) {
      setSearchParams(prev => ({ ...prev, pageSize: optimalPageSize }));
    }
  }, [optimalPageSize, searchParams.pageSize]);

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => ({ ...prev, page }));
    globalThis.window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = useCallback((query: string) => {
    setSearchParams((prev) => ({ ...prev, query, page: 1 }));
  }, []);

  const handleSortChange = useCallback((sort: string) => {
    setSearchParams((prev) => ({ ...prev, sort, page: 1 }));
  }, []);

  const handleFilter = useCallback((filters: Partial<CarSearchParams>) => {
    if (Object.keys(filters).length === 0) {
      setSearchParams(initialSearchParams);
    } else {
      setSearchParams((prev) => ({ ...prev, ...filters, page: 1 }));
    }
  }, []);

  let mainContent;

  if (loading) {
    mainContent = (
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(341px,1fr))] gap-5 px-6 pt-2">
        {Array.from({ length: searchParams.pageSize || SEARCH_CONFIG.PAGE_SIZE }, (_, i) => (
          <CarCardSkeleton
            key={`skeleton-${i}`}
            fixedWidth={false}
          />
        ))}
      </div>
    );
  } else if (carListings.length === 0) {
    mainContent = <NoData message="No car found matching your search." />;
  } else {
    mainContent = (
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(341px,1fr))] gap-5 px-6 pt-2">
        {carListings.map((car) => (
          <CarCard key={car.id} {...car} fixedWidth={false} />
        ))}
      </div>
    );
  }

  return (
    <div className=" bg-[#F8F9FA]">
      <div className="flex">
        <div className="top-0 sticky hidden md:block">
          <FilterSidebar className="bg-white" onApplyFilters={handleFilter}  carListings={carListings} loading={loading} />
        </div>
        <main className="flex-1 p-3 sm:py-6 ">
          <SearchHeader
            onSearch={handleSearch}
            onSortChange={handleSortChange}
          />
          {mainContent}
          {totalCount > (searchParams.pageSize || SEARCH_CONFIG.PAGE_SIZE) && (
          <Pagination
            currentPage={searchParams.page || 1}
            totalResults={totalCount}
            pageSize={searchParams.pageSize || SEARCH_CONFIG.PAGE_SIZE}
            onPageChange={handlePageChange}
          />
          )}
        </main>
      </div>
    </div>
  );
};

export default Search;
