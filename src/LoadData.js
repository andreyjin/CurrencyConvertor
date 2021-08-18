import { useEffect, useState } from "react";
import axios from "axios";

/* hooks for fetching data */
export const LoadData = () => {
  const [currencyRate, setCurrencyRate] = useState();
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 1000,
  });

  useEffect(() => {
    getCurrency();
  }, []);

  const getCurrency = () => {
    axiosInstance.get("/getCurrency").then((res) => {
      setCurrencyRate(res.data.data);
    });
  };

  return currencyRate;
};
