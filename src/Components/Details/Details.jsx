import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Details = () => {
  const book = useSelector((state) => state.book.selectedBook);

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-yellow-100 text-yellow-800 px-6 py-4 rounded shadow-md">
          No book selected.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-lg max-w-xl w-full p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">📚 Book Details</h2>
        
        <div className="space-y-3 text-gray-700">
          <h3 className="text-2xl font-semibold text-indigo-600">{book.title}</h3>
          <p><span className="font-medium">Author:</span> {book.author}</p>
          <p><span className="font-medium">Description:</span> {book.description}</p>
          <p><span className="font-medium">Category:</span> {book.category}</p>
          <p><span className="font-medium">Price:</span> ${book.price}</p>
          <p><span className="font-medium">Book ID:</span> {book.id}</p>
          <p><span className="font-medium">Created At:</span> {new Date(book.createdAt).toLocaleDateString()}</p>
        </div>
         <Link to="/" className='block w-32 bg-red-500 mt-4 flex justify-center items-center rounded-3xl h-8 hover:scale-105 font-bold text-[#ffffff] text-lg'>Back</Link>

      </div>
    </div>
  );
};

export default Details;
