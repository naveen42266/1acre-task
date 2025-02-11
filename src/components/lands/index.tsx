import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

interface LandsProps {
  landDetails?: Array<any>;
  slides?: Array<number>;
  calculateTotalInCrores?: (crore: any, lakhs: any) => number;
  prevSlide?: (id: number) => void;
  nextSlide?: (id: number) => void;
}

const Lands: React.FC<LandsProps> = ({
  landDetails = [],
  slides = [],
  calculateTotalInCrores = () => 0,
  prevSlide = () => {},
  nextSlide = () => {},
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 w-full mb-4">
      {landDetails.map((ele, index) => {
        const totalInCrores = calculateTotalInCrores(
          ele?.land_price?.price_per_acre_crore?.crore,
          ele?.land_price?.price_per_acre_crore?.lakh
        );

        return (
          <div key={index} className="rounded-xl shadow-md hover:shadow-xl mb-4 cursor-pointer group">
            <div className="relative">
              {ele?.land_media?.map(
                (item: { image: string; media_type: string }, idx: number) => (
                  <img
                    src={item.image}
                    alt={item.media_type}
                    key={idx}
                    className={`${
                      slides[index] === idx ? 'block' : 'hidden'
                    } h-[300px] md:h-[180px] w-full rounded-t-lg object-cover`}
                  />
                )
              )}
              <div className="absolute top-2 right-2 flex flex-row justify-between gap-3">
                <FavoriteBorderIcon fontSize="large" className="bg-white rounded-full px-[5px] border-[3px] border-white hover:border-black" />
                <ShareOutlinedIcon fontSize="large" className="bg-white rounded-full px-[5px] border-[3px] border-white hover:border-black" />
              </div>
              <div
                className="absolute bottom-2 left-2 flex flex-row justify-between gap-3 opacity-0 group-hover:opacity-100"
                onClick={() => prevSlide(index)}
              >
                <ArrowBackIosNewOutlinedIcon className="bg-white text-3xl rounded-md px-[5px] opacity-60" />
              </div>
              <div
                className="absolute bottom-2 right-2 flex flex-row justify-between gap-3 opacity-0 group-hover:opacity-100"
                onClick={() => nextSlide(index)}
              >
                <ArrowForwardIosOutlinedIcon className="bg-white text-3xl rounded-md px-[5px] opacity-60" />
              </div>
            </div>
            <div className="p-2">
              <div className="flex flex-row gap-1 items-center">
                <div className="font-bold text-base">
                  ₹ {totalInCrores > 1 ? `${totalInCrores} Cr` : `${ele?.land_price?.price_per_acre_crore?.lakh} Lakhs`} /acre •{' '}
                  {ele?.land_size?.total_land_size_in_acres?.acres > 0 ? `${ele?.land_size?.total_land_size_in_acres?.acres} Acres` : ''}{' '}
                  {ele?.land_size?.total_land_size_in_acres?.guntas > 0 ? `${ele?.land_size?.total_land_size_in_acres?.guntas} Guntas` : ''}
                </div>
                <svg
                  className="mt-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="#108ADD"
                  stroke="white"
                >
                  <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>
              <div className="text-gray-500 text-sm">
                {ele?.division_info?.find((item: any) => item?.division_type === 'mandal')?.name || ''},
                {ele?.division_info?.find((item: any) => item?.division_type === 'district')?.name || ''} (dt)
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Lands;
