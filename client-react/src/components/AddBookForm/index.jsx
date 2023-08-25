import React, { useState } from 'react';

function AddBookForm({ onBookAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    pictureUrl: '',
    review: '',
    genre: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/users/add_book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        onBookAdded(data.newBook);
        setFormData({
          title: '',
          author: '',
          pictureUrl: '',
          review: '',
          genre: '',
        });
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="mt-4 bg-gray-200 p-4 rounded-md shadow-md">
      <h3 className="text-xl font-semibold mb-2">Add New Book</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="block font-semibold mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="block font-semibold mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="pictureUrl" className="block font-semibold mb-1">
            Picture URL
          </label>
          <input
            type="text"
            id="pictureUrl"
            name="pictureUrl"
            value={formData.pictureUrl}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="review" className="block font-semibold mb-1">
            Review
          </label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="block font-semibold mb-1">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-800 focus:outline-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBookForm;
