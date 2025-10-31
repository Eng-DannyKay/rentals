import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchCarListings, fetchVehicleDetails } from "./searchThunk";
import { CarListing } from "@/types/search.interface";

export interface CarListingsResponse {
  carListings: CarListing[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

interface CarListState {
  carListings: CarListing[];
  loading: boolean;
  error: string | null;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  errorMessage: string;
  vehicleDetails: CarListing | null;
  vehicleDetailsLoading: boolean;
  vehicleDetailsError: string | null;
}

const initialState: CarListState = {
  carListings: [],
  loading: false,
  error: null,
  totalCount: 0,
  totalPages: 0,
  currentPage: 1,
  errorMessage: "",
  vehicleDetails: null,
  vehicleDetailsLoading: false,
  vehicleDetailsError: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    fetchCarListingsSuccess: (
      state,
      action: PayloadAction<CarListingsResponse>
    ) => {
      const { carListings, totalCount, totalPages, currentPage } =
        action.payload;
      state.carListings = carListings;
      state.totalCount = totalCount;
      state.totalPages = totalPages;
      state.currentPage = currentPage;
    },
    fetchCarListingsFailure: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarListings.pending, (state) => {
        state.loading = true;
        state.errorMessage = "";
      })
      .addCase(fetchCarListings.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchCarListings.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })

      // Vehicle details
      .addCase(fetchVehicleDetails.pending, (state) => {
        state.vehicleDetailsLoading = true;
        state.vehicleDetailsError = null;
        state.vehicleDetails = null;
      })
      .addCase(fetchVehicleDetails.fulfilled, (state, action) => {
        state.vehicleDetailsLoading = false;
        state.vehicleDetails = action.payload;
      })
      .addCase(fetchVehicleDetails.rejected, (state, action) => {
        state.vehicleDetailsLoading = false;
        state.vehicleDetailsError = action.payload as string;
      });
  },
});

export const { fetchCarListingsSuccess, fetchCarListingsFailure } =
  searchSlice.actions;

export default searchSlice.reducer;
