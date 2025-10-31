import axios, { axiosErrorHandler } from "@/lib/axios";
import { getErrorMessage } from "@/lib/utils";
import { CarListing, CarSearchParams } from "@/types/search.interface";
import { IResponse, PaginatedResult } from "@/types/shared.interface";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCarListingsSuccess } from "./searchSlice";

const SEARCH_PATH = "vehicles" as const;

export const fetchVehicleDetails = createAsyncThunk(
  "search/fetchVehicleDetails",
  async (vehicleId: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<IResponse<CarListing>>(
        `${SEARCH_PATH}/${vehicleId}`
      );
      return data.data;
    } catch (error) {
     const errorMessage = axiosErrorHandler(error, true);
      return rejectWithValue(getErrorMessage(errorMessage));
    }
  }
);

export const fetchCarListings = createAsyncThunk(
  "search/fetchCarListings",
  async (params: CarSearchParams, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await axios.get<IResponse<PaginatedResult<CarListing>>>(
        `${SEARCH_PATH}`,
        { params }
      );
      const { results, totalCount, totalPages } = data.data;
      dispatch(
        fetchCarListingsSuccess({
          carListings: results,
          totalCount,
          totalPages,
          currentPage: params.page || 1,
        })
      );
      return results;
    } catch (error) {
      const errorMessage = axiosErrorHandler(error, true);
      return rejectWithValue(getErrorMessage(errorMessage));
    }
  }
);


