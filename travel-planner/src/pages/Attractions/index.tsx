// src/pages/Attractions/index.tsx
import { useState } from "react";
import { getLocations } from "../../api/cityLocations";
import { getActivities } from "../../api/cityActivities";
import Tabs from "../../components/Tabs";
import SearchBar from "../../components/common/SearchBar";
import CityCard from "../../components/attraction/CityCard";
import type { Location } from "../../interfaces/CityLocation";
import type { Activity } from "../../interfaces/CityActivities";
import DestinationCard from "../../components/attraction/DestinationCard";

export default function Destination() {
  const [query, setQuery] = useState("");
  const [locations, setLocations] = useState([]);
  const [activities, setActivities] = useState([]);
  const [activitiesLoading, setActivitiesLoading] = useState(false);
  const [cityLoading, setCityLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setCityLoading(true);
      const results = await getLocations(query);
      console.log(results.data);
      setLocations(results.data);
    } catch (error) {
      console.error(error);
    } finally {
      setCityLoading(false);
    }
  };

  const handleViewActivities = async (latitude: number, longitude: number) => {
    try {
      setActivitiesLoading(true);
      const results = await getActivities(latitude, longitude);
      console.log(results.data);
      setActivities(results.data);
    } catch (error) {
      console.error(error);
    } finally {
      setActivitiesLoading(false);
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
            Fetching activities that match `{query}` ...
          </div>
        ) : (
          <>
            {" "}
            {locations.length > 0 && (
              <ul className="flex flex-wrap justify-center gap-3">
                {locations.map((loc: Location, idx) => (
                  <CityCard
                    onClick={() =>
                      handleViewActivities(
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
            {activitiesLoading ? (
              <div className="text-center text-[var(--color-accent)]">
                Fetching activities...
              </div>
            ) : (
              <>
                {activities.length === 0 ? (
                  <div className="text-center text-red-500 text-xl">
                    No activities!!!
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
                    {activities.map((act: Activity) => (
                      <DestinationCard key={act.id} act={act} />
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
