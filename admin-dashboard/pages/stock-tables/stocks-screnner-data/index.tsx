import React, { useEffect } from "react";
import "@/styles/globals.css";

const Home = () => {
  const getData = async () => {
    try {
      const response = await fetch(`/api/stocks_screnner_data`);
      if (response.ok) {
        const data =await response.json();
        console.log(data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  },[]);
  return <div>
    hii mahi
  </div>;
};

export default Home;
