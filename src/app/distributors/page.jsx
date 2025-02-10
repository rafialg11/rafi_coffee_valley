"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useAuth } from "../hooks/useAuth";
import Link from "next/link";

export default function Distributors() {
  useAuth(); // Pastikan user sudah login sebelum mengakses halaman ini

  const [distributors, setDistributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const response = await fetch("api/distributors");

        if (!response.ok) {
          throw new Error("Failed to fetch distributors");
        }

        const data = await response.json();
        setDistributors(data); 
      } catch (err) {
        console.error("Error fetching distributors:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDistributors();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="mx-12 my-4">
        <h2 className="text-xl font-bold mb-4">Distributor List</h2>

        {loading && <p>Loading distributors...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && distributors.length === 0 && (
          <p>No distributors found.</p>
        )}

        {!loading && !error && distributors.length > 0 && (
          <table className="w-full border-collapse border border-gray-400 my-4">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Distributor Name</th>
                <th className="border border-gray-300 p-2">City</th>
                <th className="border border-gray-300 p-2">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {distributors.map((distributor) => (
                <tr key={distributor.id}>
                  <td className="border border-gray-300 p-2">{distributor.name}</td>
                  <td className="border border-gray-300 p-2">{distributor.city}</td>
                  <td className="border border-gray-300 p-2">
                    <Link
                      href={`/distributors/edit/${distributor.id}`}
                      className="mr-2 bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <Link
          href="/distributors/add"
          className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
        >
          Add Distributor
        </Link>
      </div>
    </div>
  );
}
