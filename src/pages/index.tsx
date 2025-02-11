import { useState, useEffect, useCallback } from "react";
import GoogleMap from "@/components/map";
import Lands from "@/components/lands";
import { getLandDetails, getLandLocationDetails } from "@/services";

export default function Home() {
  const [landDetails, setLandDetails] = useState<Array<any>>([]);
  const [locationDetails, setLocationDetails] = useState<Array<any>>([]);
  const [slides, setSlides] = useState<number[]>([]);

  const nextSlide = (index: number) => {
    setSlides((prevSlides) =>
      prevSlides.map((slide, i) => (i === index ? (slide + 1) % landDetails[index]?.land_media?.length : slide))
    );
  };

  const prevSlide = (index: number) => {
    setSlides((prevSlides) =>
      prevSlides.map((slide, i) =>
        i === index ? (slide - 1 + landDetails[index]?.land_media?.length) % landDetails[index]?.land_media?.length : slide
      )
    );
  };

  function calculateTotalInCrores(crores: number, lakhs: number) {
    return crores + lakhs / 100;
  }

  const locationDetailsCallback = useCallback(() => locationDetails, [locationDetails]);

  useEffect(() => {
    async function fetchData() {
      const landData = await getLandDetails();
      setLandDetails(landData?.data?.results || []);
      setSlides(new Array(landData?.data?.results?.length || 0).fill(0));
      const locationData = await getLandLocationDetails();
      setLocationDetails(locationData?.data?.results || []);
    }
    fetchData();
  }, []);

  return (
    <div>
      <GoogleMap lat={17.3978971} lng={77.8618485} zoom={9} locationDetails={locationDetailsCallback()} />
      <Lands landDetails={landDetails} slides={slides} calculateTotalInCrores={calculateTotalInCrores} prevSlide={prevSlide} nextSlide={nextSlide} />
    </div>
  );
}
