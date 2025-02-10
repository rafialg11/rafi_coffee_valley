"use client"; 

import Navbar from "@/components/Navbar";
import { useAuth } from "../hooks/useAuth";

export default function Catalogue() {
  const { } = useAuth();
  return (
    <div>
      <Navbar />
      <div className="mx-12 my-4">
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr>
              <th className="border border-gray-300 ">Bean of the Day</th>              
              <th className="border border-gray-300 ">Description</th>
              <th className="border border-gray-300 ">Price / Unit</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className="border border-gray-300 ">Cubita</td>              
              <td className="border border-gray-300 ">Cubita Coffee is a robust, full-bodied coffee with a rich, complex flavor profile.</td>
              <td className="border border-gray-300 ">$11.00</td>
            </tr>
            <tr>
              <td className="border border-gray-300 ">Cubita</td>              
              <td className="border border-gray-300 ">Cubita Coffee is a robust, full-bodied coffee with a rich, complex flavor profile.</td>
              <td className="border border-gray-300 ">$11.00</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
