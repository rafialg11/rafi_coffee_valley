"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function Catalogue() {
  const [beans, setBeans] = useState([]);

  useEffect(() => {
    async function fetchBeans() {
      try {
        const res = await fetch("/api/catalogue");
        const data = await res.json();
        setBeans(data);
      } catch (error) {
        console.error("Failed to fetch beans:", error);
      }
    }
    fetchBeans();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-12 my-4">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300">Bean of the Day</th>
              <th className="border border-gray-300">Description</th>
              <th className="border border-gray-300">Price / Unit</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {beans.map((bean) => (
              <tr key={bean.id}>
                <td className="border border-gray-300">{bean.name}</td>
                <td className="border border-gray-300">{bean.description}</td>
                <td className="border border-gray-300">${bean.price}.00</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
