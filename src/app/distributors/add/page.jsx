"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/app/hooks/useAuth";

export default function AddDistributor() {
  useAuth(); // Pastikan user login sebelum bisa akses halaman ini

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
  });

  const [error, setError] = useState(null);
  const router = useRouter();

  // List negara untuk dropdown (bisa ditambahkan lebih banyak)
  const countries = ["United States", "Canada", "United Kingdom", "Indonesia", "Germany"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const res = await fetch("/api/distributors/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/distributors");
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md my-4">
        <h2 className="text-xl font-bold mb-4">Add Distributor</h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold text-md">Distributor Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">State/Region</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Country</label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select a country</option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
