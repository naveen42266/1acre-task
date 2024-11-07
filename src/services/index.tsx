import axios from "axios";


export const getLandDetails = async () => {
  return await axios
    .get(`https://prod-be.1acre.in/lands/?seller=211&page=1&page_size=10`)
    .then((res: any) => {
      return { data: res.data ?? null };
    })
    .catch((error: any) => {
      console.log("error find in catch", error);
      return null;
    });
};


export const getLandLocationDetails = async () => {
  return await axios
    .get(`https://prod-be.1acre.in/lands/landmaps/?seller_id=211`)
    .then((res: any) => {
      return { data: res.data ?? null };
    })
    .catch((error: any) => {
      console.log("error find in catch", error);
      return null;
    });
};