// src/pages/Attractions/index.tsx
import { useState } from "react";
import { getLocations } from "../../api/cityLocations";
import Tabs from "../../components/Tabs";
import SearchBar from "../../components/common/SearchBar";
import CityCard from "../../components/attraction/CityCard";
import type { Location } from "../../interfaces/CityLocation";
import { getHotels } from "../../api/hotelList";
import type { Hotel } from "../../interfaces/Hotel";
import HotelCard from "../../components/hotel/HotelCard";

export default function HotelSearch() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [hotelsLoading, setHotelsLoading] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setCityLoading(true);
      const results = await getLocations(query);
      setLocations(results.data);
    } catch (error) {
      console.error(error);
    } finally {
      setCityLoading(false);
    }
  };

  const handleViewHotels = async (latitude: number, longitude: number) => {
    try {
      setHotelsLoading(true);
      const results = await getHotels(latitude, longitude);
      console.log(JSON.stringify(results, null, 2));
      setHotels(results.data);
    } catch (error) {
      console.error(error);
    } finally {
      setHotelsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 pb-16">
      <Tabs />
      <div className="p-4 space-y-6">
        <SearchBar
          query={query}
          handleSearch={handleSearch}
          onChange={(e) => setQuery(e.target.value)}
        />

        {cityLoading ? (
          <div className="text-center">
            Fetching cities that match `{query}` ...
          </div>
        ) : (
          <>
            {" "}
            {locations.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-3">
                {locations.map((loc: Location, idx) => (
                  <CityCard
                    onClick={() =>
                      handleViewHotels(
                        loc.geoCode.latitude,
                        loc.geoCode.longitude
                      )
                    }
                    key={idx}
                    location={loc}
                  />
                ))}
              </ul>
            )}
            {hotelsLoading ? (
              <div className="text-center text-[var(--color-accent)]">
                Fetching hotels...
              </div>
            ) : (
              <>
                {hotels.length === 0 ? (
                  <div className="text-center text-red-500 text-xl">
                    No hotels!!!
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
                    {hotels.map((hotel: Hotel) => (
                      <HotelCard key={hotel.name} hotel={hotel} />
                    ))}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
