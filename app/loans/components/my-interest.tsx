import CarCard from "@/components/carCard";
import { CarListing } from "@/types/search.interface";

const CarsInterestedIn = (carListings: CarListing[]) => {
    return (
        <div className="grid grid-cols-[repeat(auto-fill,_minmax(341px,1fr))] gap-5 px-6 pt-2">
            {carListings.map((car) => (
                <CarCard key={car.id} {...car} fixedWidth={false} />
            ))}
        </div>
    );
}

export default CarsInterestedIn;