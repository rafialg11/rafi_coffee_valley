"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/app/hooks/useAuth";

export default function EditDistributor() {
  useAuth();
  
  const router = useRouter();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const countries = ["United States", "Canada", "United Kingdom", "Indonesia", "Germany"];
  
  useEffect(() => {
    const fetchDistributor = async () => {
      const res = await fetch(`/api/distributors/edit/${id}`);
      if (res.ok) {
        const data = await res.json();
        setFormData(data);
      } else {
        setError("Distributor not found");
      }
      setLoading(false);
    };

    if (id) fetchDistributor();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/distributors/edit/${id}`, {
      method: "PUT",
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md my-4">
        <h2 className="text-2xl font-bold mb-4">Edit Distributor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Distributor Name</label>
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
            Update Distributor
          </button>
        </form>
      </div>
    </div>
  );
}
