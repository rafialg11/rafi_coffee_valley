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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // List negara untuk dropdown
  const countries = ["United States", "Canada", "United Kingdom", "Indonesia", "Germany"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reset error sebelum request baru

    try {
      const response = await fetch("/api/distributors/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",          
        },
        body: JSON.stringify({
          name: formData.name,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          phone: formData.phone,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/distributors"); // Redirect ke halaman daftar distributor
      } else {
        setError(data.error || "Failed to add distributor");
      }
    } catch (err) {
      console.error("Error adding distributor:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
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
            className={`w-full p-2 rounded text-white ${loading ? "bg-gray-400" : "bg-gray-600 hover:bg-gray-700"}`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
