

export interface Seller {
  name?: string;
  contact?: string;
  rating?: number;
}

export interface CarListing {
  vendorSnapshot: Seller | null;
    _id: string;
    id: string;
    createdAt: string;
    updatedAt: string | null;
    createdBy: string;
    updatedBy: string | null;
    title: string;
    description: string;
    price: number;
    category: string;
    city: string;
    region: string;
    status: string;
    images: string[];
    reviewMemo: string;
    reviewedBy: string;
    vendorId: string;
    make: string;
    model: string;
    year: string;
    condition:  string;
    mileage: string;
    transmission: string;
    fuelType: string;
    identificationNumber: string;
    features: string[];
    color: string;
    seatingCapacity: string;
    warranty: string;
  inspectionAllowed: string;
  availabilityStatus: string;
    __v: number;
}

export interface CarSearchParams {
  page?: number;
  pageSize?: number;
  query?: string;
  status?: string;
  category?: string;
  region?: string;
  city?: string;
  make?: string;
  model?: string;
  year?: string;
  minPrice?: number;
  maxPrice?: number;
  vin?: string;
  fuelType?: string;
  transmissionType?: string;
}
