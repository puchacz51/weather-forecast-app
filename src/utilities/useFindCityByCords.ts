import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchCitiesByCoords = async (lon:number,lat:number)=>{

  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
  );

  return res.data;

}



