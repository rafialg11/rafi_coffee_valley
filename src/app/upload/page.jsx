"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function UploadDocument() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [file, setFile] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await fetch("/api/upload");
        if (!res.ok) throw new Error("Failed to fetch documents");
        const data = await res.json();
        setDocuments(data);
      } catch (err) {
        console.error("Error fetching documents:", err);
      }
    };
    fetchDocuments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !author || !file) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload document");
      const newDoc = await res.json();
      setDocuments([...documents, newDoc]);
      setTitle("");
      setAuthor("");
      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-lg mx-auto mt-10 p-6 shadow-md rounded-md my-4">
        <h2 className="text-lg font-bold mb-4">Upload Document</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <div>
            <label className="block text-sm font-semibold">Document File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full p-1 border rounded"
              required
            />
          </div>
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
          <button
            type="submit"
            className="w-full bg-gray-600 text-white p-2 rounded hover:bg-gray-700"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Document"}
          </button>
        </form>
        <div className="mt-6">
          {documents.length === 0 ? (
            <p className="text-sm text-gray-500">There are currently no reports in the library.</p>
          ) : (
            <ul className="list-disc pl-5">
              {documents.map((doc, index) => (
                <li key={index} className="text-sm">
                  {doc.title} - {doc.author} (<a href={doc.filePath} download>{doc.filePath}</a>)
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
