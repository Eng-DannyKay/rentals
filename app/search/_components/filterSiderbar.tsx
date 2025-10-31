"use client";
import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CarSearchParams, CarListing } from "@/types/search.interface";
import { cn } from "@/lib/utils";

const FilterListSkeleton = ({ count = 3, className = "" }: { count?: number; className?: string }) => (
  <>
    {Array.from({ length: count }, (_, i) => (
      <div key={`skeleton-${className}-${i}`} className={`flex items-center space-x-2 animate-pulse ${className}`}>
        <div className="w-4 h-4 bg-muted rounded" />
        <div className="flex-1 h-4 bg-muted rounded" />
        <div className="w-8 h-3 bg-muted rounded" />
      </div>
    ))}
  </>
);

const NoResultsMessage = ({ message = "No results found" }: { message?: string }) => (
  <div className="flex items-center justify-center py-4 text-muted-foreground">
    <span className="text-sm">{message}</span>
  </div>
);

interface BrandOption {
  id: string; 
  name: string;
  count: number; 
}

interface FilterSidebarProps {
  onApplyFilters?: (filters: Partial<CarSearchParams>) => void;
  carListings?: CarListing[];
  className?: string;
  loading?: boolean;
}

const TRANSMISSION_OPTIONS = [
  { value: "automatic", label: "Automatic" },
  { value: "manual", label: "Manual" },
];

const YEAR_OPTIONS = {
  min: ["2017", "2018", "2019", "2020"],
  max: ["2023", "2024", "2025"],
};

export function FilterSidebar({
  onApplyFilters,
  carListings = [],
  className,
  loading = false
}: Readonly<FilterSidebarProps>) {

  const INITIAL_BRAND_COUNT = 5;
  const INITIAL_MODEL_COUNT = 5;
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllModels, setShowAllModels] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedTransmission, setSelectedTransmission] = useState<string>("");
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [minYear, setMinYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [location, setLocation] = useState("");


  // Memoize all derived filter data in a single useMemo for performance and clarity
  const { brands, models, fuelTypes } = useMemo(() => {
    // Brands
    const brandCount = carListings.reduce((acc, { make }) => {
      if (make) acc[make] = (acc[make] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const brands: BrandOption[] = Object.entries(brandCount).map(([make, count]) => ({ id: make, name: make, count }));

    // Models
    const filtered = selectedBrands.length
      ? carListings.filter((c) => selectedBrands.includes(c.make))
      : carListings;
    const modelSet = new Set(filtered.map(({ model }) => model).filter(Boolean));
    const models: string[] = Array.from(modelSet);

    // Fuel Types
    const fuelSet = new Set(carListings.map(({ fuelType }) => fuelType).filter(Boolean));
    const fuelTypes: string[] = Array.from(fuelSet).sort((a, b) => a.localeCompare(b));

    return { brands, models, fuelTypes };
  }, [carListings, selectedBrands]);


  // Handlers
  const handleClearAll = () => {
    setSelectedBrands([]);
    setSelectedModel("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedTransmission("");
    setSelectedFuelTypes([]);
    setMinYear("");
    setMaxYear("");
    setLocation("");
    onApplyFilters?.({});
  };

  const handleApplyFilters = () => {
    const filters: Partial<CarSearchParams> = {
      make: selectedBrands.length ? selectedBrands.join(",") : undefined,
      model: selectedModel || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      transmissionType: selectedTransmission || undefined,
      fuelType: selectedFuelTypes.length ? selectedFuelTypes.join(",") : undefined,
      year:
        minYear && maxYear
          ? `${minYear}-${maxYear}`
          : minYear || maxYear || undefined,
      city: location || undefined,
    };
    onApplyFilters?.(filters);
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };
  const handleModelChange = (model: string) => setSelectedModel(model);
  const handleTransmissionChange = (val: string) => setSelectedTransmission(val);
  const handleFuelTypeChange = (fuel: string) => {
    setSelectedFuelTypes((prev) =>
      prev.includes(fuel) ? prev.filter((f) => f !== fuel) : [...prev, fuel]
    );
  };


  const hasActiveFilters = useMemo(
    () => [
      selectedBrands.length,
      selectedModel,
      minPrice,
      maxPrice,
      selectedTransmission,
      selectedFuelTypes.length,
      minYear,
      maxYear,
      location
    ].some((v) => (typeof v === "number" ? v > 0 : v !== "")),
    [
      selectedBrands,
      selectedModel,
      minPrice,
      maxPrice,
      selectedTransmission,
      selectedFuelTypes,
      minYear,
      maxYear,
      location,
    ]
  );

  // Render helpers
  const renderBrandOptions = () => {
    if (brands.length === 0) return <NoResultsMessage message="No brands available" />;
    const visibleBrands = showAllBrands ? brands : brands.slice(0, INITIAL_BRAND_COUNT);
    return visibleBrands.map((brand) => (
      <div key={brand.id} className="flex items-center space-x-2">
        <Checkbox
          id={brand.id}
          checked={selectedBrands.includes(brand.id)}
          onCheckedChange={() => handleBrandChange(brand.id)}
        />
        <Label htmlFor={brand.id} className="flex-1 text-sm font-normal cursor-pointer">
          {brand.name}
        </Label>
        <span className="text-xs text-muted-foreground">({brand.count})</span>
      </div>
    ));
  };

  const renderModelOptions = () => {
    if (loading) return <FilterListSkeleton count={Math.min(models.length || 4, 6)} className="model-skeleton" />;
    if (models.length === 0) return <NoResultsMessage message="No models available" />;
    const visibleModels = showAllModels ? models : models.slice(0, INITIAL_MODEL_COUNT);
    return visibleModels.map((modelName) => (
      <div key={modelName} className="flex items-center space-x-2">
        <RadioGroupItem value={modelName} id={modelName} />
        <Label htmlFor={modelName} className="text-sm font-normal cursor-pointer">
          {modelName}
        </Label>
      </div>
    ));
  };

  const renderFuelTypeOptions = () => {
    if (loading) return <FilterListSkeleton count={Math.min(fuelTypes.length || 3, 5)} className="fuel-skeleton" />;
    if (fuelTypes.length === 0) return <NoResultsMessage message="No fuel types available" />;
    return fuelTypes.map((fuel) => (
      <div key={fuel} className="flex items-center space-x-2">
        <Checkbox
          id={fuel}
          checked={selectedFuelTypes.includes(fuel)}
          onCheckedChange={() => handleFuelTypeChange(fuel)}
        />
        <Label htmlFor={fuel} className="text-sm font-normal cursor-pointer">
          {fuel}
        </Label>
      </div>
    ));
  };

  return (
    <div className={cn("w-80 bg-white border-r border-border sticky top-0 h-screen flex flex-col", className)}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-6 py-6 border-border">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <Button
            variant="ghost"
            size="sm"
            className="text-primary hover:text-primary-hover disabled:text-muted-foreground disabled:cursor-not-allowed"
            onClick={handleClearAll}
            disabled={!hasActiveFilters}
            child="Clear all"
          />
        </div>

        <div className="flex-1 px-6 py-6 overflow-y-auto space-y-8">
          {/* Location */}
          <Card className="rounded-none shadow-none border-none p-0">
            <CardHeader className="pb-3 px-0">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-[#353D45]">Location</CardTitle>
            </CardHeader>
            <CardContent className="-mt-6 px-0">
              <Input
                placeholder="Enter city or zip code"
                className="w-full border-[#D6DCE1] focus:border-1"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </CardContent>
          </Card>

          {/* Brand */}
          <Card className="rounded-none shadow-none border-none p-0">
            <CardHeader className="pb-3 px-0">
              <CardTitle className="text-sm font-medium flex items-center gap-2 text-[#353D45]">Brand</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3 -mt-6 px-0 pl-2 text-[#45535F]">
              {loading ? (
                <FilterListSkeleton count={Math.min(brands.length || 5, 8)} className="brand-skeleton" />
              ) : renderBrandOptions()}
              {brands.length > INITIAL_BRAND_COUNT && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary-hover p-0 h-auto"
                  child={showAllBrands ? "Show Less" : "Show More..."}
                  onClick={() => setShowAllBrands((prev) => !prev)}
                />
              )}
            </CardContent>
          </Card>

          {/* Model */}
          <Card className="rounded-none shadow-none border-none p-0">
            <CardHeader className="pb-3 px-0">
              <CardTitle className="text-sm font-medium text-[#353D45]">Model</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3 -mt-6 px-0 pl-2 text-[#45535F]">
              <RadioGroup onValueChange={handleModelChange} value={selectedModel}>
                {renderModelOptions()}
              </RadioGroup>
              {models.length > INITIAL_MODEL_COUNT && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary-hover p-0 h-auto"
                  child={showAllModels ? "Show Less" : "Show More..."}
                  onClick={() => setShowAllModels((prev) => !prev)}
                />
              )}
            </CardContent>
          </Card>

          {/* Price Range */}
          <Card className="rounded-none shadow-none border-none p-0">
            <CardHeader className="pb-3 px-0">
              <CardTitle className="text-sm font-medium text-[#353D45]">Price Range (₵)</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3 -mt-6 px-0 pl-2 text-[#45535F]">
              <div className="flex gap-2 -ml-2">
                <Input
                  placeholder="GH₵ 30,000"
                  className="flex-1 border-[#D6DCE1] focus:border-1"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <span className="flex items-center text-[#889BA8]">—</span>
                <Input
                  placeholder="GH₵ 60,000"
                  className="flex-1 border-[#D6DCE1] focus:border-1"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Year Range */}
          <Card className="rounded-none shadow-none border-none p-0">
            <CardHeader className="pb-3 px-0">
              <CardTitle className="text-sm font-medium text-[#353D45]">Year Range</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3 -mt-6 px-0 pl-2 text-[#45535F]">
              <div className="flex gap-2 -ml-2">
                <Select value={minYear} onValueChange={setMinYear}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="2017" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2017">2017</SelectItem>
                    <SelectItem value="2018">2018</SelectItem>
                    <SelectItem value="2019">2019</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                  </SelectContent>
                </Select>
                <span className="flex items-center text-muted-foreground">—</span>
                <Select value={maxYear} onValueChange={setMaxYear}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="2025" />
                  </SelectTrigger>
                  <SelectContent>
                    {YEAR_OPTIONS.max.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Transmission */}
          <Card className="rounded-none shadow-none border-none p-0">
            <CardHeader className="pb-3 px-0">
              <CardTitle className="text-sm font-medium text-[#353D45]">Transmission</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3 -mt-6 px-0 pl-2 text-[#45535F]">
              <RadioGroup onValueChange={handleTransmissionChange} value={selectedTransmission}>
                <div className="space-y-3 text-[#45535F]">
                  {TRANSMISSION_OPTIONS.map(({ value, label }) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem value={value} id={value} />
                      <Label htmlFor={value} className="text-sm font-normal cursor-pointer">{label}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Fuel Type */}
          <Card className="rounded-none shadow-none border-none p-0">
            <CardHeader className="pb-3 px-0">
              <CardTitle className="text-sm font-medium text-[#353D45]">Fuel Type</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-3 -mt-6 px-0 pl-2 text-[#45535F]">
              {renderFuelTypeOptions()}
            </CardContent>
          </Card>

          {/* Apply Filters Button */}
          <div className="sticky bottom-0 bg-white pt-4 border-t border-border">
            <Button
              className="w-full bg-primary hover:bg-primary-hover text-primary-foreground disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
              child="Apply Filters"
              onClick={handleApplyFilters}
              disabled={!hasActiveFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
