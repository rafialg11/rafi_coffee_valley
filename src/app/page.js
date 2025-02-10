"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "./hooks/useAuth";

export default function Home() {
  useAuth();

  const [beans, setBeans] = useState([]);

  useEffect(() => {
    const fetchBeans = async () => {
      try {
        const res = await fetch("/api/beans");
        const data = await res.json();
        setBeans(data);
      } catch (error) {
        console.error("Error fetching beans:", error);
      }
    };

    fetchBeans();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-12">
        {beans.length > 0 ? (
          beans.map((bean, index) => (
            <div key={index} className="mb-6 p-4 border rounded shadow">
              <h1 className="text-md font-bold my-2">Bean of the Day</h1>
              <p>{bean.name}</p>
              <h1 className="text-md font-bold my-2">Sale Price</h1>
              <p>${bean.salePrice.toFixed(2)}</p>
              <h1 className="text-md font-bold my-2">Description</h1>
              <p>{bean.description}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No beans available.</p>
        )}
      </div>
    </div>
  );
}
