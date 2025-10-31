import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchHeaderProps {
  readonly onSearch?: (query: string) => void;
  readonly onSortChange?: (sort: string) => void;
}

export function SearchHeader({ onSearch, onSortChange }: SearchHeaderProps) {
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState("latest");

  const handleSearch = () => {
    if (onSearch) onSearch(searchValue);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
    if (onSortChange) onSortChange(value);
  };

  return (
    <div>
      <div className="max-w-full md:px-6 py-6">
        <div className="space-y-4">
          <h1 className="text-2xl font-bold  text-[#353D45]">
            Browse through our extensive collection of quality vehicles
          </h1>

          <div className="flex gap-4 items-center p-6 bg-white rounded-2xl flex-wrap justify-between">
            <div className="relative flex w-full max-w-2xl gap-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#889BA8] z-10" />
              <Input
                placeholder="Search by make, model or keyword"
                className="pl-10 h-11 border-[#D6DCE1] focus:border-1"
                defaultMaxWidth={false}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <Button
                className="bg-primary hover:bg-primary-hover text-primary-foreground h-11 px-8 text-base"
                child={"Search"}
                onClick={handleSearch}
                disabled={!searchValue}
              ></Button>
            </div>

            <div className="flex items-center gap-2 ">
              <span className="text-sm text-[#58609D]">Sort by:</span>
              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[120px] h-[44px!important] text-[#45535F] border-[#D6DCE1]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="year-new">Year: Newest</SelectItem>
                  <SelectItem value="year-old">Year: Oldest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
