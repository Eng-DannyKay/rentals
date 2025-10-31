
import { RootState } from "@/lib/store";
import { createSelector } from "@reduxjs/toolkit";

const selectCarSearch = ({ carSearch }: RootState) => carSearch;

export const selectCarListings = createSelector(
  selectCarSearch,
  ({ carListings }) => carListings
);

export const selectSearchLoading = createSelector(
  selectCarSearch,
  ({ loading }) => loading
);

export const selectSearchError = createSelector(
  selectCarSearch,
  ({ errorMessage }) => errorMessage
);

export const selectTotalCount = createSelector(
  selectCarSearch,
  ({ totalCount }) => totalCount
);

export const selectTotalPages = createSelector(
  selectCarSearch,
  ({ totalPages }) => totalPages
);

export const selectCurrentPage = createSelector(
  selectCarSearch,
  ({ currentPage }) => currentPage
);

export const selectVehicleDetails = createSelector(
  selectCarSearch,
  ({ vehicleDetails }) => vehicleDetails
);

export const selectVehicleDetailsLoading = createSelector(
  selectCarSearch,
  ({ vehicleDetailsLoading }) => vehicleDetailsLoading
);

export const selectVehicleDetailsError = createSelector(
  selectCarSearch,
  ({ vehicleDetailsError }) => vehicleDetailsError
);