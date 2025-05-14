// src/pages/Recently.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { business, environmental, European, Bill, jewish } from '../../assets';

export default function Recently() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  const books = [
    {
      id: 1,
      title: 'The Routledge Atlas of Jewish History',
      image: jewish,
      rentalPrice: 5,
      description: 'A comprehensive history of the Jewish people and their journey through time.',
      rating: 0,
    },
    {
      id: 2,
      title: 'European Warfare, 1660-1815',
      image: European,
      rentalPrice: 6,
      description: 'An in-depth look into European wars between 1660 and 1815, a time of great military innovation.',
      rating: 0,
    },
    {
      id: 3,
      title: 'The Earthscan Reader in Business and Sustainable Development',
      image: business,
      rentalPrice: 7,
      description: 'A collection of pivotal readings in sustainable business practices and environmental ethics.',
      rating: 0,
    },
    {
      id: 4,
      title: 'A Short History of Nearly Everything',
      image: Bill,
      rentalPrice: 4.5,
      description: 'A fascinating exploration of the wonders of the universe, from biology to astronomy.',
      rating: 0,
    },
    {
      id: 5,
      title: 'The Routledge Atlas of Jewish History',
      image: jewish,
      rentalPrice: 5,
      description: 'A comprehensive history of the Jewish people and their journey through time.',
      rating: 0,
    },
    {
      id: 6,
      title: 'European Warfare, 1660-1815',
      image: European,
      rentalPrice: 6,
      description: 'An in-depth look into European wars between 1660 and 1815, a time of great military innovation.',
      rating: 0,
    },
  ];

  const addToCart = (book) => {
    setCart([...cart, book]);
    navigate('/cart', { state: { cart: [...cart, book] } });
  };

  const handleViewDetails = (book) => {
    // Navigate to the book details page with the book id
    navigate(`/book-details/${book.id}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-yellow-500 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      >
        &#9733;
      </span>
    ));
  };

  return (
    <div className="w-full py-12 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8">Recently Added</h2>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 sm:px-6 md:px-10 w-full">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-gray-100 rounded-lg shadow-md overflow-hidden flex flex-col h-[550px]"
          >
            <div className="h-64 w-full">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col flex-grow p-4">
              <p className="text-base font-semibold mb-1 line-clamp-2">{book.title}</p>
              <p className="text-sm text-gray-600 mb-2 line-clamp-3">{book.description}</p>
              <p className="text-lg font-semibold text-blue-500 mt-auto">Rs{book.rentalPrice} / day</p>

              <div className="mb-4">{renderStars(book.rating)}</div>

              <button
                onClick={() => addToCart(book)}
                className="bg-blue-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded w-full mt-3"
              >
                Add To Cart
              </button>

              <button
                onClick={() => handleViewDetails(book)}
                className="bg-orange-500 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded w-full mt-2"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={() => navigate('/cart', { state: { cart } })}
          className="bg-orange-500 hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-lg"
        >
          View Cart ({cart.length} items)
        </button>
      </div>
    </div>
  );
}
