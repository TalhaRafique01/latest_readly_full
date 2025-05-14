import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ axios import added

const AddBookForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    photos: [],
    author: "",
    category: "",
    edition: "",
    rentPerDay: "",
    availableQuantity: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const categories = [
    "Islamic",
    "Urdu",
    "History",
    "Law",
    "Information Technology",
    "Business",
    "Science",
    "Mathematics",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      photos: Array.from(e.target.files).slice(0, 5),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("author", formData.author);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("edition", formData.edition);
      formDataToSend.append("rentPerDay", formData.rentPerDay);
      formDataToSend.append("availableQuantity", formData.availableQuantity);

      formData.photos.forEach((photo) => {
        formDataToSend.append("photos", photo);
      });

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/books",
        formDataToSend,
        {
         headers: {
  Authorization: `Bearer ${token}`,
  "Content-Type": "multipart/form-data",
}

        }
      );
      

      const data = response.data;


      setFormData({
        title: "",
        description: "",
        photos: [],
        author: "",
        category: "",
        edition: "",
        rentPerDay: "",
        availableQuantity: "",
      });

      alert("Book added successfully!");
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Failed to add book");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleReturnBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-orange-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl border-t-4 border-orange-500"
      >
        <div className="flex items-center mb-6">
          <button
            type="button"
            onClick={handleReturnBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <h2 className="text-2xl font-bold text-center text-blue-600 flex-1">
            Add a Book
          </h2>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">{error}</div>
        )}

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
            Book Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="photos" className="block text-gray-700 font-medium mb-1">
            Upload Photos (Max 5)
          </label>
          <input
            type="file"
            id="photos"
            name="photos"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
          {formData.photos.length > 0 && (
            <div className="mt-2 text-sm text-gray-500">
              {formData.photos.length} file(s) selected
            </div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 font-medium mb-1">
            Author's Name
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-medium mb-1">
            Book Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="edition" className="block text-gray-700 font-medium mb-1">
            Book Edition
          </label>
          <input
            type="text"
            id="edition"
            name="edition"
            value={formData.edition}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="rentPerDay" className="block text-gray-700 font-medium mb-1">
            Rent Per Day (in RS)
          </label>
          <input
            type="number"
            id="rentPerDay"
            name="rentPerDay"
            value={formData.rentPerDay}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
            min="0"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="availableQuantity" className="block text-gray-700 font-medium mb-1">
            Available Quantity
          </label>
          <input
            type="number"
            id="availableQuantity"
            name="availableQuantity"
            value={formData.availableQuantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
            min="1"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${loading ? 'bg-orange-400' : 'bg-orange-500 hover:bg-orange-600'} text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-4 focus:ring-orange-300 transition-colors`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
