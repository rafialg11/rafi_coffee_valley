"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function UploadDocument() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !file) {
      alert("Please fill all fields.");
      return;
    }

    const newDoc = { title, author, fileName: file.name };
    setDocuments([...documents, newDoc]);

    // Reset form
    setTitle("");
    setAuthor("");
    setFile(null);
  };

  return (
    <div>
        <Navbar />
    <div className="max-w-lg mx-auto mt-10 p-6 shadow-md rounded-md my-4">
      
      <h2 className="text-lg font-bold mb-4">Upload Document</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-semibold">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-semibold">Document File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-1 border rounded"
            required
          />
        </div>

        {/* Author Input */}
        <div>
          <label className="block text-sm font-semibold">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
        >
          Add Document
        </button>
      </form>

      {/* List of uploaded documents */}
      <div className="mt-6">
        {documents.length === 0 ? (
          <p className="text-sm text-gray-500">There are currently no reports in the library.</p>
        ) : (
          <ul className="list-disc pl-5">
            {documents.map((doc, index) => (
              <li key={index} className="text-sm">
                {doc.title} - {doc.author} ({doc.fileName})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </div>
  );
}
